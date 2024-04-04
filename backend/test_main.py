import asyncio
import time
import uuid
from typing import List

import pytest
from fastapi.testclient import TestClient
from httpx import AsyncClient

from db.manager import CaseManager
from main import app
from models import Case, QueryCasesRequest

BASE_URL: str = "http://127.0.0.1:8000"

manager = CaseManager()
client = TestClient(app)

"""
TODO: Have test code generation working. 
"""

PROCEDURE_NAMES = [
    ("Broken Arm", "submitted"),
    ("Steroid Injection", "processing"),
    ("Something Else!", "complete"),
    ("Blah Blah Blah", "complete"),
]


def populate_test_cases() -> List[Case]:
    """Generate a list of test cases for the Case Management API."""
    test_cases = []
    for procedure_name, status in PROCEDURE_NAMES:
        case_id = f"test-case-{uuid.uuid4()}"
        case = Case(
            case_id=case_id,
            procedure_name=procedure_name,
            status=status,
            is_met=True,
            is_complete=True,
        )
        test_cases.append(case)
        manager.create_case(case)
    return test_cases


def delete_test_cases(test_cases: List[Case]):
    """Deletes test cases from the database."""
    for case in test_cases:
        manager.delete_case(case.case_id)


@pytest.fixture(autouse=True)
def manage_test_cases():
    # Setup: Populate test cases
    test_cases = populate_test_cases()
    yield test_cases
    # Teardown: Delete test cases
    delete_test_cases(test_cases)


def test_default():
    response = client.get("/")
    assert response.status_code == 200
    assert "message" in response.json()
    assert response.json()["message"] == "Welcome to the Case Management API!"


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert "status" in response.json()
    assert response.json()["status"] == "ok"


def test_get(manage_test_cases):
    case_ids = [case.case_id for case in manage_test_cases]
    for case_id in case_ids:
        response = client.get(f"/cases/{case_id}")
        assert response.status_code == 200
        case = Case(**response.json())
        assert case.case_id == case_id


def test_query(manage_test_cases):
    test_case_ids = [case.case_id for case in manage_test_cases]
    # Query using limit and no other parameters
    response = client.post("/cases/query", json={"limit": 2})
    assert response.status_code == 200
    assert len(response.json()) == 2

    # Query for all case ids
    response = client.post("/cases/query", json={"case_ids": test_case_ids})
    assert response.status_code == 200
    assert len(response.json()) == len(test_case_ids)

    # Query for cases with a specific status
    for _, status in PROCEDURE_NAMES:
        status_count = sum(1 for case in manage_test_cases if case.status == status)
        response = client.post(
            "/cases/query", json={"status": status, "case_ids": test_case_ids}
        )
        assert response.status_code == 200
        assert len(response.json()) == status_count

    # Query for cases with a specific procedure name
    for procedure_name, _ in PROCEDURE_NAMES:
        response = client.post(
            "/cases/query",
            json={"procedure_name": procedure_name, "case_ids": test_case_ids},
        )
        assert response.status_code == 200
        assert len(response.json()) == 1

    # Query for cases with a specific status and procedure name
    for procedure_name, status in PROCEDURE_NAMES:
        response = client.post(
            "/cases/query",
            json={
                "procedure_name": procedure_name,
                "status": status,
                "case_ids": test_case_ids,
            },
        )
        assert response.status_code == 200
        assert len(response.json()) == 1

    assert response.status_code == 200


def test_query_fail():
    # Test query for a status that is not valid
    response = client.post("/cases/query", json={"status": "invalid-status"})
    assert response.status_code == 422

    # Test query for limit is less than 1
    response = client.post("/cases/query", json={"limit": 0})
    assert response.status_code == 422

    # Test case ids are passed that are not strings
    response = client.post("/cases/query", json={"case_ids": [1, 2, 3]})
    assert response.status_code == 422


@pytest.mark.skip()
@pytest.mark.anyio()
async def test_create_case():
    """Could not get the async behvior here to work, will come back to this."""
    async with AsyncClient(app=app) as ac:
        # Submit case and get case_id back immediately
        response = await ac.post("/cases")
        assert response.status_code == 200
        assert "case_id" in response.json()
        case_id = response.json()["case_id"]
        assert case_id.startswith("case-id-")

        # Define a function to fetch and assert the case details asynchronously
        async def fetch_case_details(status: str, wait_time: int):
            # Wait for the specified time non-blocking
            await asyncio.sleep(wait_time)

            # Fetch the case details asynchronously
            response = await ac.get(f"/cases/{case_id}")
            assert response.status_code == 200

            # Parse case and check some basic stuff
            case = Case(**response.json())
            assert case.case_id == case_id
            assert case.status == status

        # Wait 5 seconds and get the Case object and it should be "submitted"
        await fetch_case_details("submitted", 5)

        # Wait 10 seconds and get the Case object and it should be "processing"
        await fetch_case_details("processing", 10)

        # Wait 30 seconds and get the Case object and it should be "complete"
        await fetch_case_details("complete", 30)


if __name__ == "__main__":
    pytest.main()

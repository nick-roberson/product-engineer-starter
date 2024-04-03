import random
from typing import Dict, List

# My imports
from db.manager import CaseManager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import Case

# Create FastAPI instance
app = FastAPI()

# Add CORS middleware to allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create a CaseManager instance
case_manager = CaseManager()


@app.get("/")
async def root():
    """Default route"""
    return {"message": "Hello World"}


@app.get("/health")
async def health():
    """Health check route"""
    return {"status": "ok"}


@app.post("/cases")
async def create_case() -> Dict:
    """Create a new case record, and return the id of the new case.

    Returns:
        Dict: A dictionary containing the id of the new case.
    """
    # Create a new case record
    case_id = random.randint(1, 1000)
    new_case = case_manager.create_case(case_id=case_id)
    return {"case_id": new_case.case_id}


@app.get("/cases/{case_id}")
async def get_case(case_id: int) -> Case:
    """Retrieve a case record by id.

    Args:
        case_id (int): The id of the case to retrieve.
    Returns:
        Case: A Case object representing the case record.
    """
    case = case_manager.get_case(case_id=case_id)
    return Case(**case.to_dict())


@app.get("/cases")
async def get_cases(case_ids: List[int]) -> List[Case]:
    """Retrieve multiple case records by id.

    Args:
        case_ids (List[int]): A list of case ids to retrieve.
    Returns:
        Case: A list of Case objects representing the case records.
    """
    cases = case_manager.get_many_cases(case_ids=case_ids)
    return [Case(**case.to_dict()) for case in cases]

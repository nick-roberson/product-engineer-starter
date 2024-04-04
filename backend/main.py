import logging
import random
from typing import List

from fastapi import BackgroundTasks, FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

# My imports
from db.manager import CaseManager
from models import Case, CreateCaseResponse, QueryCasesRequest
from process import process_case

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

MIN_CASE_ID = 1000
MAX_CASE_ID = 100000000


@app.get("/")
async def root():
    """Default endpoint"""
    return {"message": "Welcome to the Case Management API!"}


@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "ok"}


@app.post("/cases")
async def create_case(background_tasks: BackgroundTasks) -> CreateCaseResponse:
    """Create a new case record, and return the id of the new case. Then
    move to process the case in the background.

    Returns:
        CreateCaseResponse: The id of the new case.
    """
    # Create a new case record
    case_id = f"case-id-{random.randint(MIN_CASE_ID, MAX_CASE_ID)}"
    logging.info(f"Creating new case with id {case_id}")

    # Process the case in the background
    background_tasks.add_task(process_case, case_id)

    # Return the id of the new case
    return CreateCaseResponse(case_id=case_id)


@app.get("/cases/{case_id}")
async def get_case(case_id: str) -> Case:
    """Retrieve a case record by id.

    Args:
        case_id (str): The id of the case to retrieve.
    Returns:
        Case: A Case object representing the case record.
    Raises:
        HTTPException: If the case is not found.
        HTTPException: If there is an error parsing the case.
    """
    logging.info(f"Retrieving case with id {case_id}")

    # Get case record from the database
    case = case_manager.get_case(case_id=case_id)
    if case is None:
        raise HTTPException(status_code=404, detail=f"No case found with id {case_id}")

    # Parse and raise on parsing error
    try:
        return Case.from_record(record=case)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error parsing case: {e}")


@app.post("/cases/query")
async def get_cases(query: QueryCasesRequest) -> List[Case]:
    """Retrieve case records by query parameters. An example body request to this endpoint
    would be:

        {
            "case_ids": ["case-id-1", "case-id-2"],
            "status": "submitted",
            "procedure_name": "Procedure 1",
            "is_met": true,
            "is_complete": false,
        }

    Args:
        query (QueryCasesRequest): The query parameters.
    Returns:
        List[Case]: The case records.
    Raises:
        HTTPException: If the cases are not found.
        HTTPException: If there is an error parsing the cases.
    """
    logging.info(f"Retrieving cases with query request {query}")

    # Get case records from the database
    cases = case_manager.query_cases(query=query)
    if not cases:
        raise HTTPException(
            status_code=404, detail=f"No cases found with query parameters: {query}"
        )

    # Parse and raise on parsing error
    try:
        return [Case.from_record(record=case) for case in cases]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error parsing cases: {e}")

import random
from typing import Dict, List

# My imports
from db.manager import CaseManager
from fastapi import BackgroundTasks, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import Case, CreateCaseResponse
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
    """Default route"""
    return {"message": "Hello World"}


@app.get("/health")
async def health():
    """Health check route"""
    return {"status": "ok"}


@app.post("/cases")
async def create_case(background_tasks: BackgroundTasks) -> CreateCaseResponse:
    """Create a new case record, and return the id of the new case.

    Returns:
        Dict: A dictionary containing the id of the new case.
    """
    # Create a new case record
    case_id = f"case-id-{random.randint(MIN_CASE_ID, MAX_CASE_ID)}"

    # Run in background
    background_tasks.add_task(process_case, case_id)

    # Return the id of the new case
    return CreateCaseResponse(case_id=case_id)


@app.get("/cases/{case_id}")
async def get_case(case_id: str) -> Case:
    """Retrieve a case record by id.

    Args:
        case_id (int): The id of the case to retrieve.
    Returns:
        Case: A Case object representing the case record.
    """
    case = case_manager.get_case(case_id=case_id)
    if case is None:
        raise HTTPException(status_code=404, detail="Case not found")
    return Case.from_record(record=case)


@app.get("/cases")
async def get_cases(case_ids: List[str]) -> List[Case]:
    """Retrieve multiple case records by id.

    Args:
        case_ids (List[int]): A list of case ids to retrieve.
    Returns:
        Case: A list of Case objects representing the case records.
    """
    cases = case_manager.get_many_cases(case_ids=case_ids)
    if not cases:
        raise HTTPException(status_code=404, detail="Cases not found")
    return [Case.from_record(case.dic) for case in cases]

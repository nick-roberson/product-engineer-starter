import json
import logging
import time

# My imports
from db.manager import CaseManager
from models import Case

case_manager = CaseManager()

RESPONSE_1 = "../assets/response-1.json"
RESPONSE_2 = "../assets/response-2.json"
RESPONSE_3 = "../assets/response-3.json"
RESPONSES = {
    1: RESPONSE_1,
    2: RESPONSE_2,
    3: RESPONSE_3,
}


def get_response(response_id: int) -> Case:
    """Return the response from the given id."""
    if response_id not in RESPONSES:
        raise ValueError(f"Invalid response id: {response_id}")
    with open(RESPONSES[response_id], "r") as file:
        return Case(**json.load(file))


def process_case(case_id: str):
    """Process a case record. Here in order to actually process a case record with the sample
    data provided, we need to simulate the processing of the record. The record will be
    processed in 3 stages:

    1. For the first 10 seconds, making a retrieval request for the record will
    return a response in the format shown in `/assets/response-1.json`
    (note `summary` and `steps` are omitted whilst `status=submitted`)

    2. After 10 seconds, making a reprocess_casetrieval request for the record will
    return a response in the format shown in `/assets/response-2.json`
    (note `steps` is still omitted and `status=processing`)

    3. After 30 seconds, making a retrieval request for the record will
    return a response in the format shown in `/assets/response-3.json`
    (note all fields have been filled and `status=complete`)

    The files will be loaded and at each stage the record will be updated in the database
    with the information from the file.

    Args:
        case_id (int): The id of the case to process.
    """
    # Stage 1: Retrieve the initial case record, set the case id and status to "submitted"
    case_stage_1 = get_response(1)
    case_stage_1.case_id = case_id
    case_stage_1.status = "submitted"

    # Create the case and parse the response to get the id from the "Case" object
    updated_case = Case.from_record(case_manager.create_case(case_stage_1))
    logging.info(f"Stage 1: Case {updated_case.case_id} created and submitted")

    # Sleep for 10 seconds
    time.sleep(10)

    # Stage 2: Update the case record with the second stage, set the id and case_id, and save it to the database
    case_stage_2 = get_response(2)
    case_stage_2.id = updated_case.id
    case_stage_2.case_id = case_id

    # Save the updated case
    updated_case = Case.from_record(case_manager.update_case(case_stage_2))
    logging.info(f"Stage 2: Case {updated_case.case_id} updated and processing")

    # Sleep for 30 seconds
    time.sleep(30)

    # Stage 3: Update the case record with the third stage, set the id and case_id, and save it to the database
    case_stage_3 = get_response(3)
    case_stage_3.id = updated_case.id
    case_stage_3.case_id = case_id

    # Save the updated case
    updated_case = Case.from_record(case_manager.update_case(case_stage_3))
    logging.info(f"Stage 3: Case {updated_case.case_id} updated and complete")

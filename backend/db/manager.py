import logging
from datetime import datetime
from typing import List

from db.constants import MYSQL_URL
from db.models import CaseDBModel
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


class CaseManager:
    def __init__(self):
        engine = create_engine(MYSQL_URL)
        self.session_factory = sessionmaker(bind=engine)
        logging.info("CaseManager successfully initialized")

    def create_case(self, new_case: "Case") -> CaseDBModel:
        """Create a new case record in the database."""
        logging.info(
            f"Creating case with id {new_case.id} and case_id {new_case.case_id}"
        )
        # Create a new session instance
        session = self.session_factory()
        try:
            # Create a new CaseDBModel object
            new_db_case = CaseDBModel(**new_case.to_record())

            # Add the new case to the session
            session.add(new_db_case)
            session.commit()

            # Refresh and return the generated id
            session.refresh(new_db_case)
            return new_db_case
        finally:
            session.close()

    def update_case(self, updated_case: "Case") -> CaseDBModel:
        """Update an existing case record in the database."""
        logging.info(
            f"Updating case with id {updated_case.id} and case_id {updated_case.case_id}"
        )
        session = self.session_factory()
        try:
            # Update the updated_at timestamp
            db_model = CaseDBModel(**updated_case.to_record())
            db_model.updated_at = datetime.now()

            # Push the updated case to the session
            session.merge(db_model)
            session.commit()

            # Query the updated case and return it
            updated_case = (
                session.query(CaseDBModel).filter_by(id=updated_case.id).first()
            )
            return updated_case
        finally:
            session.close()

    def get_case(self, case_id: str) -> CaseDBModel:
        """Retrieve a case record from the database by id."""
        session = self.session_factory()
        try:
            case = session.query(CaseDBModel).filter_by(case_id=case_id).first()
            return case
        finally:
            session.close()

    def get_many_cases(self, case_ids: List[str]) -> List[CaseDBModel]:
        """Retrieve multiple case records from the database by id."""
        session = self.session_factory()
        try:
            cases = (
                session.query(CaseDBModel).filter(CaseDBModel.id.in_(case_ids)).all()
            )
            return cases
        finally:
            session.close()

    def close_session(self):
        """This method is now redundant since each action opens and closes its session."""
        pass

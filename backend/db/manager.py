import logging
from typing import List

from db.constants import MYSQL_URL
from db.models import Case
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


class CaseManager:

    def __init__(self):
        # Create a database session
        engine = create_engine(MYSQL_URL)
        Session = sessionmaker(bind=engine)
        self.session_factory = Session
        # Log that we have initialized the manager
        logging.info("CaseManager successfully initialized")

    def create_case(self, case_id: int) -> Case:
        """Create a new case record in the database."""
        # Create a new session instance
        session = self.session_factory()
        try:
            # Create a new Case object
            new_case = Case(case_id=case_id)
            # Add the new case to the session
            session.add(new_case)
            session.commit()
            # Refresh and return the generated id
            session.refresh(new_case)
            return new_case
        finally:
            session.close()

    def get_case(self, case_id: int) -> Case:
        """Retrieve a case record from the database by id."""
        session = self.session_factory()
        try:
            case = session.query(Case).filter_by(case_id=case_id).first()
            return case
        finally:
            session.close()

    def get_many_cases(self, case_ids: List[int]) -> List[Case]:
        """Retrieve multiple case records from the database by id."""
        session = self.session_factory()
        try:
            cases = session.query(Case).filter(Case.id.in_(case_ids)).all()
            return cases
        finally:
            session.close()

    def close_session(self):
        """This method is now redundant since each action opens and closes its session."""
        pass

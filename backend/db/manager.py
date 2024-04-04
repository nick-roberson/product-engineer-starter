import logging
from datetime import datetime
from typing import List

from db.constants import MYSQL_URL
from db.models import CaseDBModel
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


class CaseManager:
    """Case manager to handle all database operations for the case records."""

    def __init__(self):
        """Initialize the CaseManager."""
        engine = create_engine(MYSQL_URL)
        self.session_factory = sessionmaker(bind=engine)
        logging.info("CaseManager successfully initialized")

    def create_case(self, new_case: "Case") -> CaseDBModel:
        """Create a new case record in the database.

        Args:
            new_case (Case): The new case record.
        Returns:
            CaseDBModel: The created case record.
        """
        logging.info(
            f"Creating case with id {new_case.id} and case_id {new_case.case_id}"
        )
        # Create a new session instance
        session = self.session_factory()
        try:
            # Create a new CaseDBModel object
            new_db_case = CaseDBModel(**new_case.to_record())
            new_db_case.created_at = datetime.now()
            new_db_case.updated_at = datetime.now()

            # Add the new case to the session
            session.add(new_db_case)
            session.commit()

            # Refresh and return the generated id
            session.refresh(new_db_case)
            return new_db_case
        except Exception as e:
            logging.error(f"Error creating case: {e}")
            session.rollback()
            raise
        finally:
            session.close()

    def update_case(self, updated_case: "Case") -> CaseDBModel:
        """Update an existing case record in the database.

        Args:
            updated_case (Case): The updated case record.
        Returns:
            CaseDBModel: The updated case record.
        """
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
                session.query(CaseDBModel)
                .filter_by(case_id=updated_case.case_id)
                .first()
            )
            return updated_case
        except Exception as e:
            logging.error(f"Error updating case: {e}")
            session.rollback()
            raise
        finally:
            session.close()

    def get_case(self, case_id: str) -> CaseDBModel:
        """Retrieve a case record from the database by id.

        Args:
            case_id (str): The id of the case to retrieve.
        Returns:
            CaseDBModel: The case record.
        """
        session = self.session_factory()
        try:
            case = session.query(CaseDBModel).filter_by(case_id=case_id).first()
            return case
        except Exception as e:
            logging.error(f"Error retrieving case: {e}")
            raise
        finally:
            session.close()

    def query_cases(self, query: "QueryCasesRequest") -> List[CaseDBModel]:
        """Retrieve multiple case records from the database by id.

        Args:
            query (QueryCasesRequest): The query parameters.
        Returns:
            List[CaseDBModel]: A list of case records.
        """
        session = self.session_factory()
        try:
            # Start with a base query
            session_query = session.query(CaseDBModel)

            # Handle "in" case for caseIds
            if query.case_ids:
                session_query = session_query.filter(
                    CaseDBModel.case_id.in_(query.case_ids)
                )

            # Handle simpler query parameters
            if query.status:
                session_query = session_query.filter_by(status=query.status)
            if query.procedure_name:
                session_query = session_query.filter_by(
                    procedure_name=query.procedure_name
                )
            if query.is_met is not None:
                session_query = session_query.filter_by(is_met=query.is_met)
            if query.is_complete is not None:
                session_query = session_query.filter_by(is_complete=query.is_complete)

            # If limit is applied set the limit
            if query.limit:
                session_query = session_query.limit(query.limit)

            # Run query and return results
            return session_query.all()
        except Exception as e:
            logging.error(f"Error retrieving cases: {e}")
            raise
        finally:
            session.close()

    def close_session(self):
        """This method is now redundant since each action opens and closes its session."""
        pass

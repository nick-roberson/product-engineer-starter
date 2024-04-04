import enum
import json
from datetime import datetime
from typing import Dict, List, Optional, Union

from pydantic import BaseModel, validator

from db.models import CaseDBModel


class Option(BaseModel):
    """Pydantic model for an option in a step in a case record."""

    key: str
    text: str
    selected: bool


class LogicItem(BaseModel):
    """Pydantic model for a logic in a step in a case record."""

    text: str
    selected: bool


class EvidenceItem(BaseModel):
    """Pydantic model for an evidence in a case record."""

    content: str
    page_number: int
    pdf_name: str
    event_datetime: Optional[str] = None


class Step(BaseModel):
    """Pydantic model for a step in a case record."""

    key: str
    question: str
    options: Optional[List[Option]] = None
    logic: Optional[List[LogicItem]] = None
    reasoning: str
    decision: str
    next_step: str
    is_met: bool
    is_final: bool
    evidence: Optional[List[EvidenceItem]] = None


class CaseStatus(enum.Enum):
    """Enum class for the status of a case."""

    SUBMITTED = "submitted"
    PROCESSING = "processing"
    COMPLETED = "complete"

    @classmethod
    def has_value(cls, value):
        return any(value == item.value for item in cls)

    @classmethod
    def get_values(cls):
        return [item.value for item in cls]


class Case(BaseModel):
    """Pydantic model for a case record."""

    # Unique identifiers for the case
    id: Optional[int] = None
    case_id: str

    # Information about the claim
    status: str = CaseStatus.SUBMITTED.value

    procedure_name: Union[str, None] = None
    summary: Union[str, None] = None

    is_met: bool = False
    is_complete: bool = False

    steps: List[Step] = []
    cpt_codes: List[str] = []

    # Created at and updated at timestamps
    created_at: str = datetime.now().isoformat()
    updated_at: str = datetime.now().isoformat()

    # Time since the case was last updated
    time_since_upload: int = 0

    @validator("status")
    def validate_status(cls, value):
        if CaseStatus.has_value(value) is False:
            raise ValueError(
                f"Invalid status: {value}, must be one of {CaseStatus.get_values()}"
            )
        return value

    def to_record(self) -> Dict:
        """Convert the Pydantic model to a json that can be stored in the database."""
        try:
            steps = json.dumps([step.dict() for step in self.steps])
            return {
                "id": self.id,
                "case_id": self.case_id,
                "status": self.status,
                "procedure_name": self.procedure_name,
                "cpt_codes": self.cpt_codes,
                "summary": self.summary,
                "is_met": self.is_met,
                "is_complete": self.is_complete,
                "steps": steps,
            }
        except Exception as e:
            raise ValueError(f"Error converting case to Dict record: {e}")

    @classmethod
    def from_record(cls, record: CaseDBModel) -> "Case":
        """Convert from a Database record to a Pydantic model."""
        try:
            # Parse steps
            steps = []
            if record.steps:
                steps_json = json.loads(record.steps)
                steps = [Step(**step) for step in steps_json]

            # Get the time since the case was last updated in seconds
            delta_seconds = (datetime.now() - record.created_at).total_seconds()
            time_since_upload = int(delta_seconds)

            # Return the Pydantic model
            return Case(
                id=record.id,
                case_id=record.case_id,
                status=record.status,
                procedure_name=record.procedure_name,
                cpt_codes=record.cpt_codes,
                summary=record.summary,
                is_met=record.is_met,
                is_complete=record.is_complete,
                steps=steps,
                created_at=record.created_at.isoformat(),
                updated_at=record.updated_at.isoformat(),
                time_since_upload=time_since_upload,
            )
        except Exception as e:
            raise ValueError(f"Error parsing case from CaseDBModel -> Case: {e}")

    class Config:
        from_attributes = True


class CreateCaseResponse(BaseModel):
    """Pydantic model for create case response."""

    case_id: str

    def __repr__(self):
        return f"CreateCaseResponse(case_id={self.case_id})"


class QueryCasesRequest(BaseModel):
    """Pydantic model for query cases request."""

    DEFAULT_LIMIT: int = 100

    case_ids: List[str] = None
    status: Optional[str] = None
    procedure_name: Optional[str] = None
    is_met: Optional[bool] = None
    is_complete: Optional[bool] = None
    limit: Optional[int] = DEFAULT_LIMIT

    @validator("limit")
    def validate_limit(cls, value):
        if value is not None and value < 1:
            raise ValueError("Limit must be greater than 0")
        return value

    @validator("case_ids")
    def validate_case_ids(cls, value):
        """Validate that the case_ids are a list of strings."""
        if value and not all(isinstance(item, str) for item in value):
            raise ValueError("case_ids must be a list of strings")
        return value

    @validator("status")
    def validate_status(cls, value):
        """Validate that the status is a valid CaseStatus."""
        if value and CaseStatus.has_value(value) is False:
            raise ValueError(
                f"Invalid status: {value}, must be one of {CaseStatus.get_values()}"
            )
        return value

    def __repr__(self):
        return (
            f"QueryCasesRequest(case_ids={self.case_ids}, status={self.status}, "
            f"procedure_name={self.procedure_name}, is_met={self.is_met}, "
            f"is_complete={self.is_complete}, limit={self.limit})"
        )

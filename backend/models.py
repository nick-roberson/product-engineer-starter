import json
from datetime import datetime
from typing import Dict, List, Optional, Union

from db.models import CaseDBModel
from pydantic import BaseModel

DEFAULT_STATUS: str = "submitted"


class CreateCaseResponse(BaseModel):
    """Pydantic model for create case response."""

    case_id: str


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


class Case(BaseModel):
    """Pydantic model for a case record."""

    # Unique identifiers for the case
    id: Optional[int] = None
    case_id: str

    # Information about the claim
    status: str = DEFAULT_STATUS
    procedure_name: Union[str, None] = None
    cpt_codes: List[str] = []
    summary: Union[str, None] = None
    is_met: bool = False
    is_complete: bool = False
    steps: List[Step] = []

    # Created at and updated at timestamps
    created_at: str = datetime.now().isoformat()
    updated_at: str = datetime.now().isoformat()

    # Time since the case was last updated
    time_since_updated: float = 0.0

    def to_record(self) -> Dict:
        """Convert the Pydantic model to a json that can be stored in the database."""
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
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

    @classmethod
    def from_record(cls, record: CaseDBModel) -> "Case":
        """Convert from a Database record to a Pydantic model."""
        # Parse steps
        steps = []
        if record.steps:
            steps_json = json.loads(record.steps)
            steps = [Step(**step) for step in steps_json]

        # Get the time since the case was last updated in seconds
        delta = datetime.now() - record.updated_at
        time_since_updated = delta.total_seconds()

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
            time_since_updated=time_since_updated,
        )

    class Config:
        orm_mode = True

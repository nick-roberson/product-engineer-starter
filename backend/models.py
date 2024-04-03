from datetime import datetime

from pydantic import BaseModel


class Case(BaseModel):
    """Pydantic model for a case record."""

    case_id: int
    created_at: datetime
    status: str = "submitted"

    class Config:
        orm_mode = True
        extra = "forbid"

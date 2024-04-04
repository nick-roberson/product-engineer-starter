from sqlalchemy import JSON, Boolean, Column, DateTime, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()


class CaseDBModel(Base):
    """SQLAlchemy ORM model for the case records."""

    # Name of the table in the `co_helm` database
    __tablename__ = "case"

    # Auto incrementing primary key
    id = Column(Integer, primary_key=True, autoincrement=True)

    # Case Data
    case_id = Column(String(100), nullable=False, unique=True)
    status = Column(String(100), nullable=False)

    # Optional Fields that _may_ be absent on case initialization
    procedure_name = Column(String(100), nullable=True)
    cpt_codes = Column(JSON, nullable=True)
    summary = Column(Text, nullable=True)
    is_met = Column(Boolean, nullable=True)
    is_complete = Column(Boolean, nullable=True)

    # Handling steps, here we just store the JSON representation of the steps
    # This could be a separate table with a foreign key to the case id
    # but for simplicity and speed of retrieval we will store it as a JSON field
    steps = Column(JSON, nullable=True)

    # Timestamps to track when the record was created and last updated
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

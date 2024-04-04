from sqlalchemy import JSON, Boolean, Column, DateTime, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()


class CaseDBModel(Base):

    __tablename__ = "case"

    # Autoincrementing primary key
    id = Column(Integer, primary_key=True, autoincrement=True)

    # Case Data
    case_id = Column(String(100), nullable=False, unique=True)
    status = Column(String(100), nullable=False)

    # Optional Fields
    procedure_name = Column(String(100), nullable=True)
    cpt_codes = Column(JSON, nullable=True)
    summary = Column(Text, nullable=True)
    is_met = Column(Boolean, nullable=True)
    is_complete = Column(Boolean, nullable=True)
    steps = Column(JSON, nullable=True)

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

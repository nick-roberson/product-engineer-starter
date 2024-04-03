from sqlalchemy import Column, DateTime, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()


class Case(Base):

    __tablename__ = "cases"

    case_id = Column(Integer, primary_key=True)
    created_at = Column(DateTime(timezone=False), server_default=func.now())
    status = Column(String(20), default="submitted")

    def to_dict(self):
        return {
            "case_id": self.case_id,
            "created_at": self.created_at,
            "status": self.status,
        }

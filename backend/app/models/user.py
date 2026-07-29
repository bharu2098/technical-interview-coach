from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # One user can have many interview sessions
    interview_sessions = relationship(
        "InterviewSession",
        back_populates="user",
        cascade="all, delete-orphan"
    )
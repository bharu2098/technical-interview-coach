from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class InterviewSession(Base):
    __tablename__ = "interview_sessions"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    interview_type = Column(String(100), nullable=False)

    difficulty = Column(String(50), nullable=False)

    status = Column(String(50), default="In Progress")

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationship with User
    user = relationship(
        "User",
        back_populates="interview_sessions"
    )

    # Relationship with Questions
    questions = relationship(
        "InterviewQuestion",
        back_populates="session",
        cascade="all, delete-orphan"
    )

    # Relationship with Answers
    answers = relationship(
        "InterviewAnswer",
        back_populates="session",
        cascade="all, delete-orphan"
    )

    # Relationship with Result
    result = relationship(
        "InterviewResult",
        back_populates="session",
        uselist=False,
        cascade="all, delete-orphan"
    )
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class InterviewSession(Base):
    __tablename__ = "interview_sessions"

    # Primary Key (Global Unique ID)
    id = Column(Integer, primary_key=True, index=True)

    # User who owns this interview
    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    # Interview number for each user
    # Example:
    # User 1 -> 1,2,3...
    # User 2 -> 1,2...
    interview_number = Column(
        Integer,
        nullable=False
    )

    # Technology / Interview Type
    interview_type = Column(
        String(100),
        nullable=False
    )

    # Easy / Intermediate / Hard
    difficulty = Column(
        String(50),
        nullable=False
    )

    # Interview Status
    status = Column(
        String(50),
        default="In Progress"
    )

    # Created Time
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    # -------------------------
    # Relationships
    # -------------------------

    # User
    user = relationship(
        "User",
        back_populates="interview_sessions"
    )

    # Questions
    questions = relationship(
        "InterviewQuestion",
        back_populates="session",
        cascade="all, delete-orphan"
    )

    # Answers
    answers = relationship(
        "InterviewAnswer",
        back_populates="session",
        cascade="all, delete-orphan"
    )

    # Final Result
    result = relationship(
        "InterviewResult",
        back_populates="session",
        uselist=False,
        cascade="all, delete-orphan"
    )
from sqlalchemy import Column, Integer, Text, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class InterviewQuestion(Base):
    __tablename__ = "interview_questions"

    id = Column(Integer, primary_key=True, index=True)

    session_id = Column(
        Integer,
        ForeignKey("interview_sessions.id"),
        nullable=False
    )

    question = Column(Text, nullable=False)

    category = Column(String(100), nullable=False)

    difficulty = Column(String(50), nullable=False)

    session = relationship(
        "InterviewSession",
        back_populates="questions"
    )

    answer = relationship(
        "InterviewAnswer",
        back_populates="question",
        uselist=False,
        cascade="all, delete-orphan"
    )
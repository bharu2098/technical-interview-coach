from sqlalchemy import Column, Integer, Text, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class InterviewAnswer(Base):
    __tablename__ = "interview_answers"

    id = Column(Integer, primary_key=True, index=True)

    session_id = Column(
        Integer,
        ForeignKey("interview_sessions.id"),
        nullable=False
    )

    question_id = Column(
        Integer,
        ForeignKey("interview_questions.id"),
        nullable=False,
        unique=True
    )

    answer = Column(Text, nullable=False)

    score = Column(Integer, default=0)

    feedback = Column(Text)

    session = relationship(
        "InterviewSession",
        back_populates="answers"
    )

    question = relationship(
        "InterviewQuestion",
        back_populates="answer"
    )
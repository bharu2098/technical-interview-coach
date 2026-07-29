from sqlalchemy import Column, Integer, Float, Text, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class InterviewResult(Base):
    __tablename__ = "interview_results"

    id = Column(Integer, primary_key=True, index=True)

    session_id = Column(
        Integer,
        ForeignKey("interview_sessions.id"),
        nullable=False,
        unique=True
    )

    overall_score = Column(Float, default=0.0)

    strengths = Column(Text)

    weaknesses = Column(Text)

    ai_feedback = Column(Text)

    recommendation = Column(Text)

    session = relationship(
        "InterviewSession",
        back_populates="result"
    )
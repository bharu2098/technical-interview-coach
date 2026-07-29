from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.models.user import User
from app.models.interview_session import InterviewSession
from app.schemas.interview import InterviewCreate

router = APIRouter(
    prefix="/interviews",
    tags=["Interviews"]
)


@router.post("/")
def create_interview(
    interview: InterviewCreate,
    db: Session = Depends(get_db)
):
    # Check whether the user exists
    user = db.query(User).filter(User.id == interview.user_id).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    session = InterviewSession(
        user_id=interview.user_id,
        interview_type=interview.interview_type,
        difficulty=interview.difficulty,
        status="In Progress"
    )

    db.add(session)
    db.commit()
    db.refresh(session)

    return {
        "message": "Interview session created successfully",
        "session_id": session.id,
        "status": session.status
    }


@router.get("/{session_id}")
def get_interview(
    session_id: int,
    db: Session = Depends(get_db)
):
    session = (
        db.query(InterviewSession)
        .filter(InterviewSession.id == session_id)
        .first()
    )

    if not session:
        raise HTTPException(
            status_code=404,
            detail="Interview session not found"
        )

    return session
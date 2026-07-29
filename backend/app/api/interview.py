from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies import get_db

from app.models.user import User
from app.models.interview_session import InterviewSession
from app.models.interview_question import InterviewQuestion

from app.schemas.interview import InterviewCreate

from app.prompts.interview_prompt import build_interview_prompt
from app.services.gemini_service import generate_questions

router = APIRouter(
    prefix="/interviews",
    tags=["Interviews"]
)


# ==========================================================
# Create Interview Session
# ==========================================================

@router.post("/")
def create_interview(
    interview: InterviewCreate,
    db: Session = Depends(get_db)
):
    user = (
        db.query(User)
        .filter(User.id == interview.user_id)
        .first()
    )

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


# ==========================================================
# Get Interview Session
# ==========================================================

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


# ==========================================================
# Generate AI Interview Questions
# ==========================================================

@router.post("/{session_id}/generate")
def generate_interview_questions(
    session_id: int,
    db: Session = Depends(get_db)
):
    interview = (
        db.query(InterviewSession)
        .filter(InterviewSession.id == session_id)
        .first()
    )

    if not interview:
        raise HTTPException(
            status_code=404,
            detail="Interview session not found"
        )

    # Build Prompt
    prompt = build_interview_prompt(
        technology=interview.interview_type,
        difficulty=interview.difficulty,
        num_questions=5
    )

    # Generate Questions using Gemini
    ai_response = generate_questions(prompt)

    questions = []

    for line in ai_response.split("\n"):

        line = line.strip()

        if not line:
            continue

        if line[0].isdigit():
            line = line.split(".", 1)[-1].strip()

        questions.append(line)

    # Delete previous questions
    db.query(InterviewQuestion).filter(
        InterviewQuestion.session_id == session_id
    ).delete()

    db.commit()

    saved_questions = []

    # Save Questions
    for index, question in enumerate(questions, start=1):

        interview_question = InterviewQuestion(
            session_id=session_id,
            question_number=index,
            question_text=question,
            category=interview.interview_type,
            difficulty=interview.difficulty
        )

        db.add(interview_question)

        saved_questions.append({
            "question_number": index,
            "question": question
        })

    db.commit()

    return {
        "message": "Interview questions generated successfully",
        "session_id": session_id,
        "technology": interview.interview_type,
        "difficulty": interview.difficulty,
        "total_questions": len(saved_questions),
        "questions": saved_questions
    }


# ==========================================================
# Get Generated Interview Questions
# ==========================================================

@router.get("/{session_id}/questions")
def get_interview_questions(
    session_id: int,
    db: Session = Depends(get_db)
):
    interview = (
        db.query(InterviewSession)
        .filter(InterviewSession.id == session_id)
        .first()
    )

    if not interview:
        raise HTTPException(
            status_code=404,
            detail="Interview session not found"
        )

    questions = (
        db.query(InterviewQuestion)
        .filter(InterviewQuestion.session_id == session_id)
        .order_by(InterviewQuestion.question_number)
        .all()
    )

    if not questions:
        raise HTTPException(
            status_code=404,
            detail="No interview questions found. Generate questions first."
        )

    return {
        "session_id": session_id,
        "technology": interview.interview_type,
        "difficulty": interview.difficulty,
        "total_questions": len(questions),
        "questions": [
            {
                "question_id": question.id,
                "question_number": question.question_number,
                "question": question.question_text,
                "category": question.category,
                "difficulty": question.difficulty
            }
            for question in questions
        ]
    }
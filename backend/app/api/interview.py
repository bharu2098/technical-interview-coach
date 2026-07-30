from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.prompts.evaluation_prompt import build_evaluation_prompt
from app.prompts.report_prompt import build_report_prompt
from app.services.gemini_service import (
    generate_questions,
    evaluate_answer,
    generate_report
)
from app.dependencies import get_db

from app.models.user import User
from app.models.interview_session import InterviewSession
from app.models.interview_question import InterviewQuestion
from app.models.interview_answer import InterviewAnswer

from app.schemas.interview import InterviewCreate, AnswerSubmit
from app.prompts.interview_prompt import build_interview_prompt

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
# Get User Interviews
# ==========================================================

@router.get("/user/{user_id}")
def get_user_interviews(
    user_id: int,
    db: Session = Depends(get_db)
):
    interviews = (
        db.query(InterviewSession)
        .filter(InterviewSession.user_id == user_id)
        .order_by(InterviewSession.created_at.desc())
        .all()
    )

    return [
        {
            "id": interview.id,
            "user_id": interview.user_id,
            "interview_type": interview.interview_type,
            "difficulty": interview.difficulty,
            "status": interview.status,
            "created_at": interview.created_at
        }
        for interview in interviews
    ]


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

    prompt = build_interview_prompt(
        technology=interview.interview_type,
        difficulty=interview.difficulty,
        num_questions=5
    )

    ai_response = generate_questions(prompt)

    questions = []

    for line in ai_response.split("\n"):

        line = line.strip()

        if not line:
            continue

        if line[0].isdigit():
            line = line.split(".", 1)[1].strip()

        questions.append(line)

    # Delete old questions
    db.query(InterviewQuestion).filter(
        InterviewQuestion.session_id == session_id
    ).delete()

    db.commit()

    saved_questions = []

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


# ==========================================================
# Submit Interview Answer
# ==========================================================
@router.post("/{session_id}/answer")
def submit_answer(
    session_id: int,
    answer_data: AnswerSubmit,
    db: Session = Depends(get_db)
):

    # Check interview session
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

    # Check question
    question = (
        db.query(InterviewQuestion)
        .filter(
            InterviewQuestion.id == answer_data.question_id,
            InterviewQuestion.session_id == session_id
        )
        .first()
    )

    if not question:
        raise HTTPException(
            status_code=404,
            detail="Question not found"
        )

    # Check if answer already exists
    existing_answer = (
        db.query(InterviewAnswer)
        .filter(
            InterviewAnswer.session_id == session_id,
            InterviewAnswer.question_id == answer_data.question_id
        )
        .first()
    )

    # Save or update answer
    if existing_answer:
        answer = existing_answer
        answer.answer = answer_data.answer

    else:
        answer = InterviewAnswer(
            session_id=session_id,
            question_id=answer_data.question_id,
            answer=answer_data.answer
        )

        db.add(answer)

    db.commit()
    db.refresh(answer)

    # Build evaluation prompt
    prompt = build_evaluation_prompt(
        question.question_text,
        answer.answer
    )

    print("\n========== PROMPT SENT TO GEMINI ==========\n")
    print(prompt)
    print("\n===========================================\n")

    # Evaluate with Gemini
    ai_response = evaluate_answer(prompt)

    print("\n========== GEMINI RESPONSE ==========\n")
    print(ai_response)
    print("\n=====================================\n")

    # Extract score and feedback
    import re

    score = 0
    feedback = ""

    score_match = re.search(
        r"Score\s*:\s*(\d+)",
        ai_response,
        re.IGNORECASE
    )

    if score_match:
        score = int(score_match.group(1))

    feedback_match = re.search(
        r"Feedback\s*:\s*(.*)",
        ai_response,
        re.IGNORECASE | re.DOTALL
    )

    if feedback_match:
        feedback = feedback_match.group(1).strip()

    # Save evaluation
    answer.score = score
    answer.feedback = feedback

    db.commit()
    db.refresh(answer)

    return {
        "message": "Answer evaluated successfully",
        "question_id": question.id,
        "question_number": question.question_number,
        "score": answer.score,
        "feedback": answer.feedback
    }

# ==========================================================
# Generate Final Interview Report
# ==========================================================

@router.get("/{session_id}/report")
def get_interview_report(
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

    answers = (
        db.query(InterviewAnswer)
        .filter(InterviewAnswer.session_id == session_id)
        .all()
    )

    if not answers:
        raise HTTPException(
            status_code=404,
            detail="No answers found."
        )

    answered_questions = len(answers)
    total_questions = len(questions)

    total_score = sum(answer.score or 0 for answer in answers)
    average_score = total_score / answered_questions
    percentage = (total_score / (total_questions * 10)) * 100

    questions_answers = ""

    for question in questions:

        answer = next(
            (
                a for a in answers
                if a.question_id == question.id
            ),
            None
        )

        questions_answers += (
            f"Question {question.question_number}: "
            f"{question.question_text}\n"
        )

        questions_answers += (
            f"Answer: "
            f"{answer.answer if answer else 'Not Answered'}\n\n"
        )

    prompt = build_report_prompt(
        technology=interview.interview_type,
        total_score=total_score,
        average_score=average_score,
        percentage=percentage,
        questions_answers=questions_answers
    )

    ai_report = generate_report(prompt)
    interview.status = "Completed"
    db.commit()
    return {
        "session_id": session_id,
        "technology": interview.interview_type,
        "difficulty": interview.difficulty,
        "status": interview.status,
        "total_questions": total_questions,
        "answered_questions": answered_questions,
        "total_score": total_score,
        "average_score": round(average_score, 2),
        "percentage": round(percentage, 2),
        "ai_report": ai_report
    }
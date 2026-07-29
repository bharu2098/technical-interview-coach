from pydantic import BaseModel


class InterviewCreate(BaseModel):
    user_id: int
    interview_type: str
    difficulty: str


class AnswerSubmit(BaseModel):
    question_id: int
    answer: str

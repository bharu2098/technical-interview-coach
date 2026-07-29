from pydantic import BaseModel


class InterviewResultResponse(BaseModel):
    overall_score: float
    strengths: str
    weaknesses: str
    ai_feedback: str
    recommendation: str

    model_config = {
        "from_attributes": True
    }
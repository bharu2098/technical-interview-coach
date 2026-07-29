import google.generativeai as genai

from app.config import settings

# Configure Gemini
genai.configure(api_key=settings.GOOGLE_API_KEY)

# Load Gemini Model
model = genai.GenerativeModel("gemini-2.5-flash")


# ==========================================================
# Generate Interview Questions
# ==========================================================

def generate_questions(prompt: str):
    """
    Generate interview questions using Gemini AI.
    """

    try:
        response = model.generate_content(prompt)

        if response.text:
            return response.text

        return "No questions generated."

    except Exception as e:
        raise Exception(f"Gemini Error: {str(e)}")


# ==========================================================
# Evaluate Candidate Answer
# ==========================================================

def evaluate_answer(prompt: str):
    """
    Evaluate candidate answer using Gemini AI.
    """

    try:
        response = model.generate_content(prompt)

        if response.text:
            return response.text

        return "No evaluation generated."

    except Exception as e:
        raise Exception(f"Gemini Error: {str(e)}")
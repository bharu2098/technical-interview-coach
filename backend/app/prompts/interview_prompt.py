def build_interview_prompt(
    technology: str,
    difficulty: str,
    num_questions: int = 5
):
    return f"""
You are a senior software engineer conducting a technical interview.

Generate exactly {num_questions} interview questions.

Technology: {technology}
Difficulty: {difficulty}

Requirements:
1. Return only the questions.
2. Number each question.
3. Do not provide answers.
4. Do not include explanations.
5. Questions should increase gradually in difficulty.
"""
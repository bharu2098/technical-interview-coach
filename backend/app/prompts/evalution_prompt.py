def build_evaluation_prompt(question: str, answer: str) -> str:
    return f"""
You are an expert technical interviewer.

Evaluate the candidate's answer professionally.

Question:
{question}

Candidate Answer:
{answer}

Evaluate based on:

1. Technical correctness
2. Completeness
3. Clarity
4. Best practices

Give a score between 0 and 10.

Return ONLY in this exact format:

Score: 8

Feedback:
Your feedback here.
"""
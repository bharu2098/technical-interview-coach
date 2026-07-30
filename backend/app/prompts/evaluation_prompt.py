def build_evaluation_prompt(question: str, answer: str) -> str:
    return f"""
You are a senior technical interviewer.

Evaluate the candidate's answer.

QUESTION:
{question}

CANDIDATE ANSWER:
{answer}

Evaluate based on:

1. Technical correctness
2. Completeness
3. Clarity
4. Best practices

Give a score out of 10.

Return ONLY in this exact format:

Score: 8
Feedback: Good explanation. Mentioning functools.wraps and a code example would improve the answer.

Do not return markdown.
Do not return JSON.
Do not add extra headings.
Do not add any explanation outside the required format.
"""
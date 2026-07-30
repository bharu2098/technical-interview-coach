def build_report_prompt(
    technology: str,
    total_score: int,
    average_score: float,
    percentage: float,
    questions_answers: str
) -> str:

    return f"""
You are a Senior Technical Interviewer.

Generate a final interview report.

Technology:
{technology}

Total Score:
{total_score}/50

Average Score:
{average_score:.2f}/10

Percentage:
{percentage:.2f}%

Candidate Responses:

{questions_answers}

Return ONLY in this format:

Overall Summary:
<summary>

Strengths:
- Point 1
- Point 2
- Point 3

Weaknesses:
- Point 1
- Point 2
- Point 3

Recommendation:
Hire / Consider / Needs Improvement
"""
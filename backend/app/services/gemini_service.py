from groq import Groq

from app.config import settings

client = Groq(api_key=settings.GROQ_API_KEY)

MODEL = "llama-3.3-70b-versatile"


def _generate(prompt: str, task: str):
    try:
        print(f"\n========== {task.upper()} PROMPT ==========\n")
        print(prompt)

        response = client.chat.completions.create(
            model=MODEL,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.7
        )

        text = response.choices[0].message.content.strip()

        print(f"\n========== {task.upper()} RESPONSE ==========\n")
        print(text)

        return text

    except Exception as e:
        print(f"\nGroq {task} Error: {e}\n")
        raise Exception(f"Groq {task} Error: {e}")


def generate_questions(prompt: str):
    return _generate(prompt, "Question Generation")


def evaluate_answer(prompt: str):
    return _generate(prompt, "Answer Evaluation")


def generate_report(prompt: str):
    return _generate(prompt, "Interview Report")
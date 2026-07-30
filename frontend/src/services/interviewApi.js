const BASE_URL = "http://127.0.0.1:8000";

export async function createInterview(data) {
  const response = await fetch(`${BASE_URL}/interviews/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create interview");
  }

  return response.json();
}

export async function generateQuestions(sessionId) {
  const response = await fetch(
    `${BASE_URL}/interviews/${sessionId}/generate`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to generate questions");
  }

  return response.json();
}

export async function getQuestions(sessionId) {
  const response = await fetch(
    `${BASE_URL}/interviews/${sessionId}/questions`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch questions");
  }

  return response.json();
}

export async function submitAnswer(sessionId, data) {
  const response = await fetch(
    `${BASE_URL}/interviews/${sessionId}/answer`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to submit answer");
  }

  return response.json();
}

export async function getReport(sessionId) {
  const response = await fetch(
    `${BASE_URL}/interviews/${sessionId}/report`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch report");
  }

  return response.json();
}
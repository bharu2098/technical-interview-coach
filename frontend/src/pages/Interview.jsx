import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProgressBar from "../components/ProgressBar";
import Timer from "../components/Timer";
import QuestionCard from "../components/QuestionCard";
import AnswerBox from "../components/AnswerBox";
import InterviewControls from "../components/InterviewControls";

import {
  getQuestions,
  submitAnswer,
} from "../services/interviewApi";

function Interview() {
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const [interview, setInterview] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [answers, setAnswers] = useState({});

  const [evaluation, setEvaluation] = useState(null);

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

 useEffect(() => {
  loadQuestions();
}, [sessionId]);

  async function loadQuestions() {
    try {
      setLoading(true);

      const data = await getQuestions(sessionId);

      setInterview(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load interview questions.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-3xl font-bold text-blue-600">
          Loading Interview...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-red-600">
          {error}
        </h2>
      </div>
    );
  }

  const currentQuestion = interview.questions[currentIndex];

  const currentAnswer =
    answers[currentQuestion.question_id] || "";

  const progress =
    ((currentIndex + 1) / interview.total_questions) * 100;

  function handleAnswerChange(value) {
  setAnswers((prev) => ({
    ...prev,
    [currentQuestion.question_id]: value,
  }));

  setEvaluation(null);
}

  async function handleSubmit() {

  if (evaluation) {
    return;
  }

  if (!currentAnswer.trim()) {
    alert("Please enter your answer.");
    return;
  }

  setSubmitting(true);

  try {
    const result = await submitAnswer(sessionId, {
      question_id: currentQuestion.question_id,
      answer: currentAnswer,
    });

    setEvaluation(result);

  } catch (err) {
    console.error(err);
    setError("Failed to submit answer. Please try again.");

  } finally {
    setSubmitting(false);
  }
}


  function handlePrevious() {
    if (currentIndex === 0) return;

    setCurrentIndex((prev) => prev - 1);

    setEvaluation(null);
  }

 function handleNext() {
  if (!evaluation) {
    alert("Please submit your answer before moving to the next question.");
    return;
  }

  if (currentIndex < interview.total_questions - 1) {
    setCurrentIndex((prev) => prev + 1);
    setEvaluation(null);
  }
}
function handleFinish() {
  if (!evaluation) {
    alert("Please submit the last answer.");
    return;
  }

  navigate(`/report/${sessionId}`);
}
  return (
    <div className="min-h-screen bg-slate-100 py-10 px-6">

      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}

        <div className="bg-white rounded-xl shadow-md p-6">

          <h1 className="text-4xl font-bold text-slate-800">
            Technical Interview
          </h1>

          <p className="text-slate-500 mt-2">
            Answer every question carefully before moving forward.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-6">

            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">
                Technology
              </p>

              <h3 className="text-xl font-bold text-blue-700">
                {interview.technology}
              </h3>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">
                Difficulty
              </p>

              <h3 className="text-xl font-bold text-green-700">
                {interview.difficulty}
              </h3>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">
                Progress
              </p>

              <h3 className="text-xl font-bold text-purple-700">
                {progress.toFixed(0)}%
              </h3>
            </div>

          </div>

        </div>
         {error && (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
    {error}
  </div>
)}
        {/* Progress */}

        <ProgressBar
          currentQuestion={currentIndex + 1}
          totalQuestions={interview.total_questions}
        />

        {/* Timer */}

        <Timer initialTime={600} />

        {/* Question */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-2xl font-bold mb-5">
            Question {currentIndex + 1} of {interview.total_questions}
          </h2>

          <QuestionCard
            question={currentQuestion.question}
            difficulty={currentQuestion.difficulty}
          />

        </div>

        {/* Answer */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-4">
            Your Answer
          </h2>

          <AnswerBox
            answer={currentAnswer}
            setAnswer={handleAnswerChange}
          />

        </div>

        {/* Evaluation */}

        {evaluation && (

          <div className="bg-green-50 border border-green-300 rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold text-green-700">
              AI Evaluation
            </h2>

            <div className="mt-4">

              <p className="text-lg">
                <strong>Score:</strong> {evaluation.score}/10
              </p>

            </div>

            <div className="mt-4">

              <h3 className="font-semibold mb-2">
                Feedback
              </h3>

              <p className="text-gray-700 whitespace-pre-wrap">
                {evaluation.feedback}
              </p>

            </div>

          </div>

        )}

        {/* Controls */}

        <InterviewControls
          onPrevious={handlePrevious}
          onSubmit={handleSubmit}
          onNext={handleNext}
          onFinish={handleFinish}
          disablePrevious={currentIndex === 0}
          disableNext={currentIndex === interview.total_questions - 1}
          loading={submitting}
        />

      </div>

    </div>
  );
}

export default Interview;
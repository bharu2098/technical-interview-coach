import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReport } from "../services/interviewApi";

function Report() {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadReport();
  }, [sessionId]);

  async function loadReport() {
    try {
      setLoading(true);
      const data = await getReport(sessionId);
      setReport(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load interview report.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <h2 className="text-3xl font-bold text-blue-600">
          Generating AI Report...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            {error}
          </h2>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Report not found.
          </h2>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-6">

      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}

        <div className="bg-white rounded-xl shadow-md p-8">

          <h1 className="text-4xl font-bold text-slate-800">
            Interview Report
          </h1>

          <p className="text-slate-500 mt-2">
            AI generated performance summary of your interview.
          </p>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500 text-sm">
              Total Score
            </p>

            <h2 className="text-4xl font-bold text-blue-700 mt-2">
              {report.total_score}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500 text-sm">
              Average Score
            </p>

            <h2 className="text-4xl font-bold text-green-700 mt-2">
              {report.average_score}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500 text-sm">
              Questions Answered
            </p>

            <h2 className="text-4xl font-bold text-purple-700 mt-2">
              {report.answered_questions}/{report.total_questions}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500 text-sm">
              Percentage
            </p>

            <h2
              className={`text-4xl font-bold mt-2 ${
                report.percentage >= 80
                  ? "text-green-600"
                  : report.percentage >= 60
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {report.percentage}%
            </h2>
          </div>

        </div>

        {/* Interview Details */}

        <div className="bg-white rounded-xl shadow-md p-8">

          <h2 className="text-2xl font-bold mb-6">
            Interview Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div>
              <p className="text-gray-500">
                Technology
              </p>

              <h3 className="text-xl font-semibold">
                {report.technology}
              </h3>
            </div>

            <div>
              <p className="text-gray-500">
                Difficulty
              </p>

              <h3 className="text-xl font-semibold">
                {report.difficulty}
              </h3>
            </div>

            <div>
              <p className="text-gray-500">
                Status
              </p>

              <span
                className={`inline-block mt-2 px-4 py-2 rounded-full font-semibold ${
                  report.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {report.status}
              </span>
            </div>

          </div>

        </div>

        {/* AI Feedback */}

        <div className="bg-white rounded-xl shadow-md p-8">

          <h2 className="text-2xl font-bold text-green-700 mb-6">
            AI Performance Feedback
          </h2>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 whitespace-pre-wrap leading-8">
            {report.ai_report}
          </div>

        </div>

        {/* Buttons */}

        <div className="flex justify-between items-center flex-wrap gap-4">

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition"
          >
            Back to Dashboard
          </button>

          <button
            disabled
            className="bg-gray-400 text-white px-6 py-3 rounded-lg cursor-not-allowed"
          >
            Download PDF (Coming Soon)
          </button>

        </div>

      </div>

    </div>
  );
}

export default Report;
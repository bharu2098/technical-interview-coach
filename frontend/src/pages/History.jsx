import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL = "https://technical-interview-coach.onrender.com";

function History() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      const response = await fetch(`${BASE_URL}/interviews/`);

      if (!response.ok) {
        throw new Error("Failed to fetch interview history");
      }

      const data = await response.json();

      // Sort latest interviews first
      const sorted = [...data].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setInterviews(sorted);
    } catch (err) {
      console.error("History Error:", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center mt-20 text-xl font-semibold">
        Loading interviews...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Interview History
      </h1>

      {interviews.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">
          No interviews found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Technology</th>
                <th className="p-3">Difficulty</th>
                <th className="p-3">Status</th>
                <th className="p-3">Created</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {interviews.map((interview) => (
                <tr
                  key={interview.id}
                  className="border-b hover:bg-gray-100"
                >
                  <td className="p-3 text-center">
                    {interview.id}
                  </td>

                  <td className="p-3 text-center">
                    {interview.interview_type}
                  </td>

                  <td className="p-3 text-center">
                    {interview.difficulty}
                  </td>

                  <td className="p-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-white font-semibold ${
                        interview.status === "Completed"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {interview.status}
                    </span>
                  </td>

                  <td className="p-3 text-center">
                    {new Date(interview.created_at).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>

                  <td className="p-3 text-center">
                    {interview.status === "Completed" ? (
                      <Link
                        to={`/report/${interview.id}`}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                      >
                        View Report
                      </Link>
                    ) : (
                      <Link
                        to={`/interview/${interview.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                      >
                        Resume
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default History;
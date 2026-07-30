import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createInterview,
  generateQuestions,
} from "../services/interviewApi";

function Dashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
  });

  const [interviews, setInterviews] = useState([]);

  const [formData, setFormData] = useState({
    user_id: 1, // Replace with JWT user later
    interview_type: "React Developer",
    difficulty: "Medium",
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const response = await fetch("http://127.0.0.1:8000/interviews/");
      const data = await response.json();

      const sorted = [...data].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setInterviews(sorted);

      setStats({
        total: sorted.length,
        completed: sorted.filter(
          (item) => item.status === "Completed"
        ).length,
        inProgress: sorted.filter(
          (item) => item.status === "In Progress"
        ).length,
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function startInterview() {
    try {
      setLoading(true);

      const session = await createInterview(formData);

      await generateQuestions(session.session_id);

      await loadDashboard();

      navigate(`/interview/${session.session_id}`);
    } catch (err) {
      console.error(err);
      alert("Unable to start interview.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-10">

      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Technical Interview Dashboard
      </h1>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-blue-600 rounded-xl shadow-lg p-6 text-white">
          <p className="text-lg font-medium">
            Total Interviews
          </p>

          <h2 className="text-5xl font-bold mt-4">
            {stats.total}
          </h2>
        </div>

        <div className="bg-green-600 rounded-xl shadow-lg p-6 text-white">
          <p className="text-lg font-medium">
            Completed
          </p>

          <h2 className="text-5xl font-bold mt-4">
            {stats.completed}
          </h2>
        </div>

        <div className="bg-yellow-500 rounded-xl shadow-lg p-6 text-white">
          <p className="text-lg font-medium">
            In Progress
          </p>

          <h2 className="text-5xl font-bold mt-4">
            {stats.inProgress}
          </h2>
        </div>

      </div>

      {/* Start Interview */}

      <div className="bg-white rounded-xl shadow-lg p-8 mt-10">

        <h2 className="text-2xl font-bold mb-6">
          Start New Interview
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <label className="block mb-2 font-semibold">
              Technology
            </label>

            <select
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.interview_type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  interview_type: e.target.value,
                })
              }
            >
              <option>React Developer</option>
              <option>Python Developer</option>
              <option>Java Developer</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>Full Stack Developer</option>
            </select>

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Difficulty
            </label>

            <select
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.difficulty}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  difficulty: e.target.value,
                })
              }
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

          </div>

        </div>

        <button
          onClick={startInterview}
          disabled={loading}
          className={`mt-8 px-8 py-3 rounded-lg text-white font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Starting Interview..." : "Start Interview"}
        </button>

      </div>

      {/* Interview History */}

      <div className="bg-white rounded-xl shadow-lg p-8 mt-10">

        <h2 className="text-2xl font-bold mb-6">
          Recent Interview History
        </h2>

        {interviews.length === 0 ? (
          <p className="text-gray-500">
            No interviews found.
          </p>
        ) : (

          <div className="overflow-x-auto rounded-lg border">

            <table className="min-w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="text-left px-5 py-3">
                    Technology
                  </th>

                  <th className="text-left px-5 py-3">
                    Difficulty
                  </th>

                  <th className="text-left px-5 py-3">
                    Status
                  </th>

                  <th className="text-left px-5 py-3">
                    Created
                  </th>

                  <th className="text-center px-5 py-3">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {interviews.slice(0, 5).map((item) => (

                  <tr
                    key={item.id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="px-5 py-4">
                      {item.interview_type}
                    </td>

                    <td className="px-5 py-4">
                      {item.difficulty}
                    </td>

                    <td className="px-5 py-4">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          item.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.status}
                      </span>

                    </td>

                    <td className="px-5 py-4">
                      {new Date(item.created_at).toLocaleString(
                        "en-IN",
                        {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }
                      )}
                    </td>

                    <td className="px-5 py-4 text-center">

                      {item.status === "Completed" ? (

                        <button
                          onClick={() =>
                            navigate(`/report/${item.id}`)
                          }
                          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
                        >
                          View Report
                        </button>

                      ) : (

                        <button
                          onClick={() =>
                            navigate(`/interview/${item.id}`)
                          }
                          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                        >
                          Resume
                        </button>

                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default Dashboard;
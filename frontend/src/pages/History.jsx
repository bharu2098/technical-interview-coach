import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function History() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/interviews/")
      .then((res) => res.json())
      .then((data) => {
        setInterviews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-20 text-xl">
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
        <table className="w-full border shadow-lg rounded-lg overflow-hidden">
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
                    className={`px-3 py-1 rounded-full text-white ${
                      interview.status === "Completed"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {interview.status}
                  </span>
                </td>

                <td className="p-3 text-center">
                  {new Date(interview.created_at).toLocaleDateString()}
                </td>

                <td className="p-3 text-center">
                  <Link
                    to={`/report/${interview.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    View Report
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default History;
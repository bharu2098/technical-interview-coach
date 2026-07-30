import { Link } from "react-router-dom";

const interviews = [
  {
    id: 1,
    title: "React Interview",
    date: "Today",
    score: "92%",
    difficulty: "Medium",
    status: "Completed",
  },
  {
    id: 2,
    title: "Python Basics",
    date: "Yesterday",
    score: "88%",
    difficulty: "Easy",
    status: "Completed",
  },
  {
    id: 3,
    title: "Data Structures",
    date: "2 Days Ago",
    score: "84%",
    difficulty: "Hard",
    status: "Completed",
  },
];

function RecentInterviews() {
  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            Recent Interviews
          </h2>

          <p className="text-slate-500 mt-1">
            Review your latest interview sessions.
          </p>
        </div>

        <Link
          to="/history"
          className="text-blue-600 font-semibold hover:underline"
        >
          View All →
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-4 text-left">Interview</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Difficulty</th>
              <th className="px-6 py-4 text-left">Score</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {interviews.map((item) => (
              <tr
                key={item.id}
                className="border-t hover:bg-slate-50 transition"
              >
                <td className="px-6 py-5 font-semibold">
                  {item.title}
                </td>

                <td className="px-6 py-5">
                  {item.date}
                </td>

                <td className="px-6 py-5">
                  {item.difficulty}
                </td>

                <td className="px-6 py-5 font-bold text-green-600">
                  {item.score}
                </td>

                <td className="px-6 py-5">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    {item.status}
                  </span>
                </td>

                <td className="px-6 py-5 text-center">
                  <Link
                    to="/report"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
                  >
                    View Report
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default RecentInterviews;
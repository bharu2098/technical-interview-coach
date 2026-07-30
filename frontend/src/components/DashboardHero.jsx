import { Link } from "react-router-dom";

function DashboardHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white shadow-2xl">

      {/* Background Blur */}
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-purple-400/20 blur-3xl"></div>

      <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center px-6 md:px-10 lg:px-14 py-12">

        {/* LEFT */}

        <div>

          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-5 py-2 text-sm font-semibold">
            🤖 AI Technical Interview Coach
          </span>

          <h1 className="mt-8 text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold leading-tight">

            Welcome Back 👋

            <br />

            <span className="text-yellow-300">
              Ready For Your
            </span>

            <br />

            Next Interview?

          </h1>

          <p className="mt-6 max-w-2xl text-base md:text-lg leading-8 text-blue-100">
            Continue your AI interview preparation with realistic mock
            interviews, coding challenges, AI-powered feedback,
            communication analysis and detailed performance reports.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              to="/interview/1"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              Start New Interview
            </Link>

            <Link
              to="/history"
              className="rounded-xl border border-white px-6 py-3 font-semibold transition hover:bg-white hover:text-blue-700"
            >
              📜 View Reports
            </Link>

          </div>

        </div>

        {/* RIGHT */}

        <div className="hidden lg:block">

          <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md p-8 shadow-xl">

            <h2 className="mb-8 text-3xl font-bold flex items-center gap-3">
              📈 Performance Overview
            </h2>

            <div className="space-y-6">

              <div className="flex justify-between items-center border-b border-white/20 pb-3">

                <span className="text-blue-100">
                  Interviews Completed
                </span>

                <span className="text-3xl font-bold">
                  25
                </span>

              </div>

              <div className="flex justify-between items-center border-b border-white/20 pb-3">

                <span className="text-blue-100">
                  Average Score
                </span>

                <span className="text-3xl font-bold text-green-300">
                  87%
                </span>

              </div>

              <div className="flex justify-between items-center border-b border-white/20 pb-3">

                <span className="text-blue-100">
                  Success Rate
                </span>

                <span className="text-3xl font-bold text-yellow-300">
                  95%
                </span>

              </div>

              <div className="flex justify-between items-center">

                <span className="text-blue-100">
                  Global Rank
                </span>

                <span className="text-3xl font-bold text-pink-300">
                  #12
                </span>

              </div>

            </div>

            <div className="mt-8 rounded-2xl border border-white/20 bg-white/10 p-5">

              <p className="text-xs uppercase tracking-widest text-blue-200 font-semibold">
                AI Recommendation
              </p>

              <p className="mt-3 text-base leading-7 font-medium">
                Practice one more React interview today to improve your
                frontend confidence and increase your overall score.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default DashboardHero;
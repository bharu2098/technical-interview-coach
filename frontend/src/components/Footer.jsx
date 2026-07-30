import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid md:grid-cols-3 gap-10">

          <div>

            <h2 className="text-3xl font-bold text-blue-400">
              InterviewCoach
            </h2>

            <p className="mt-5 text-slate-400 leading-7">
              AI powered platform that helps software engineers
              practice technical interviews and improve their skills.
            </p>

          </div>

          <div>

            <h3 className="text-xl font-semibold mb-5">
              Quick Links
            </h3>

            <div className="space-y-3">

              <Link to="/" className="block hover:text-blue-400">
                Home
              </Link>

              <Link to="/dashboard" className="block hover:text-blue-400">
                Dashboard
              </Link>

              <Link to="/history" className="block hover:text-blue-400">
                History
              </Link>

              <Link to="/login" className="block hover:text-blue-400">
                Login
              </Link>

            </div>

          </div>

          <div>

            <h3 className="text-xl font-semibold mb-5">
              Contact
            </h3>

            <p className="text-slate-400">
              support@interviewcoach.ai
            </p>

            <p className="text-slate-400 mt-3">
              AI Technical Interview Preparation
            </p>

          </div>

        </div>

        <div className="border-t border-slate-700 mt-10 pt-6 text-center text-slate-500">

          © 2026 Technical Interview Coach. All Rights Reserved.

        </div>

      </div>

    </footer>
  );
}

export default Footer;
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userEmail = localStorage.getItem("userEmail");

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");

    navigate("/");
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}

        <Link
          to="/"
          className="text-3xl font-bold text-blue-600"
        >
          InterviewCoach
        </Link>

        {/* Navigation */}

        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="font-medium text-slate-700 hover:text-blue-600 transition"
          >
            Home
          </Link>

          {token ? (
            <>
              <Link
                to="/dashboard"
                className="font-medium text-slate-700 hover:text-blue-600 transition"
              >
                Dashboard
              </Link>

              <Link
                to="/history"
                className="font-medium text-slate-700 hover:text-blue-600 transition"
              >
                History
              </Link>

              <span className="hidden lg:block text-sm text-gray-500">
                {userEmail}
              </span>

              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="font-medium text-slate-700 hover:text-blue-600 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
              >
                Register
              </Link>
            </>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;
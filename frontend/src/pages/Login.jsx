import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authApi";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("userId", data.user_id);
      localStorage.setItem("userEmail", data.email);

      alert("Login Successful!");

      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* Left Section */}

        <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700">

          <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>

          <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-purple-300/20 blur-3xl"></div>

          <div className="relative z-10 flex flex-col justify-center p-16">

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/20 px-5 py-2 text-sm font-semibold backdrop-blur">
              🤖 AI Technical Interview Coach
            </span>

            <h1 className="mt-8 text-5xl font-extrabold leading-tight text-white">
              Welcome Back
              <br />
              <span className="text-yellow-300">
                Interview Champion 👋
              </span>
            </h1>

            <p className="mt-8 text-lg leading-8 text-blue-100">
              Practice technical interviews with AI, improve your coding,
              communication skills, and prepare confidently for software
              engineering interviews.
            </p>

            <div className="mt-12 space-y-6 text-white">

              <div className="flex items-center gap-4">
                <span className="text-3xl">🤖</span>
                <span className="text-lg">AI Mock Interviews</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-3xl">📊</span>
                <span className="text-lg">Performance Reports</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-3xl">🎤</span>
                <span className="text-lg">Communication Analysis</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-3xl">📈</span>
                <span className="text-lg">Progress Tracking</span>
              </div>

            </div>

          </div>

        </div>

        {/* Right Section */}

        <div className="flex items-center justify-center p-10 lg:p-16">

          <div className="w-full max-w-md">

            <h2 className="text-4xl font-bold text-slate-800">
              Login
            </h2>

            <p className="mt-2 text-slate-500">
              Login to continue your interview preparation.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
            >

              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block font-semibold text-slate-700"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-4 text-lg outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-200"
                />

              </div>

              <div>

                <label
                  htmlFor="password"
                  className="mb-2 block font-semibold text-slate-700"
                >
                  Password
                </label>

                <div className="relative">

                  <input
                    id="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-4 pr-14 text-lg outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-200"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xl"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>

                </div>

              </div>

              <div className="flex items-center">

  <label className="flex cursor-pointer items-center gap-2">

    <input
      name="remember"
      type="checkbox"
      checked={formData.remember}
      onChange={handleChange}
      className="accent-blue-600"
    />

    Remember Me

  </label>

</div>

              <button
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-4 text-lg font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

            </form>

            <p className="mt-8 text-center text-slate-600">

              Don't have an account?

              <Link
                to="/register"
                className="ml-2 font-semibold text-blue-600 hover:underline"
              >
                Register
              </Link>

            </p>

            <p className="mt-10 text-center text-sm text-slate-400">
              © 2026 Technical Interview Coach
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;
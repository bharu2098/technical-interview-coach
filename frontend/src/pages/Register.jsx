import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authApi";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await registerUser({
        full_name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      alert("Registration Successful!");

      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/login");
    } catch (error) {
      console.error(error);

      if (error.message) {
        alert(error.message);
      } else {
        alert("Registration Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-300 hover:shadow-[0_25px_70px_rgba(0,0,0,0.18)] grid lg:grid-cols-2">

        {/* LEFT */}
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 lg:flex">

          <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>

          <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-purple-300/20 blur-3xl"></div>

          <div className="relative z-10 flex flex-col justify-center p-16">

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/20 px-5 py-2 text-sm font-semibold backdrop-blur">
              🚀 Join AI Technical Interview Coach
            </span>

            <h1 className="mt-8 text-4xl xl:text-5xl font-extrabold leading-tight text-white">
              Start Your
              <br />
              <span className="text-yellow-300">
                Success Journey 🚀
              </span>
            </h1>

            <p className="mt-8 max-w-lg text-lg leading-8 text-blue-100">
              Create your account and begin practicing AI-powered technical
              interviews, track your progress, and land your dream software
              engineering job.
            </p>

            <div className="mt-12 space-y-6">

              <div className="flex items-center gap-4">
                <span className="text-2xl">✅</span>
                <span className="text-lg text-white">
                  Unlimited AI Interviews
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-2xl">📊</span>
                <span className="text-lg text-white">
                  Smart Performance Analytics
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-2xl">🎯</span>
                <span className="text-lg text-white">
                  Personalized Feedback
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-2xl">🏆</span>
                <span className="text-lg text-white">
                  Interview Ready Dashboard
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="flex items-center justify-center p-10 lg:p-16">

          <div className="w-full max-w-md">

            <h2 className="text-4xl font-bold text-slate-800">
              Create Account
            </h2>

            <p className="mt-2 text-slate-500">
              Register and start preparing with AI.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* Name */}

              <div>

                <label
                  htmlFor="fullName"
                  className="mb-2 block font-semibold text-slate-700"
                >
                  Full Name
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-4 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-200"
                />

              </div>

              {/* Email */}

              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block font-semibold text-slate-700"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-4 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-200"
                />

              </div>

              {/* Password */}

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
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    minLength={8}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create password"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-4 pr-14 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-200"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-slate-500 hover:text-blue-600"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>

                </div>

              </div>

              {/* Confirm Password */}

              <div>

                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block font-semibold text-slate-700"
                >
                  Confirm Password
                </label>

                <div className="relative">

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    minLength={8}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-4 pr-14 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-200"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-slate-500 hover:text-blue-600"
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </button>

                </div>

              </div>

              {/* Register Button */}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-400/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

            </form>


            <p className="mt-8 text-center text-slate-600">

              Already have an account?

              <Link
                to="/login"
                className="ml-2 font-semibold text-blue-600 hover:underline"
              >
                Login
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

export default Register;
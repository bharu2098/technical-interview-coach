import { Link } from "react-router-dom";
import heroImage from "../assets/hero.png";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 min-h-[90vh] flex items-center">

        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">

          {/* Left Section */}
          <div>

            <span className="inline-block bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-sm font-semibold mb-6">
              🚀 AI Powered Technical Interview Platform
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              Master Your
              <br />
              Technical Interviews
              <br />
              <span className="text-yellow-300">with AI</span>
            </h1>

            <p className="mt-8 text-lg lg:text-xl text-blue-100 leading-8 max-w-xl">
              Practice coding interviews, receive instant AI feedback,
              improve communication skills, and prepare confidently for
              software engineering roles at top companies.
            </p>

            {/* Buttons */}

            <div className="mt-10 flex flex-wrap gap-5">

              <Link
                to="/register"
                className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold shadow-xl hover:scale-105 transition duration-300"
              >
                 Start Free
              </Link>

              <Link
                to="/login"
                className="border-2 border-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-700 transition duration-300"
              >
                Login
              </Link>

            </div>

            {/* Stats */}

            <div className="mt-14 grid grid-cols-3 gap-6">

              <div>
                <h2 className="text-4xl font-bold">1000+</h2>
                <p className="text-blue-100 mt-2">
                  Interviews
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-bold">95%</h2>
                <p className="text-blue-100 mt-2">
                  Success Rate
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-bold">24/7</h2>
                <p className="text-blue-100 mt-2">
                  AI Support
                </p>
              </div>

            </div>

          </div>

          {/* Right Section */}

          <div className="hidden lg:flex justify-center items-center">

            <div className="relative">

              {/* Glow */}

              <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full"></div>

              <img
                src={heroImage}
                alt="AI Interview Coach"
                className="relative w-[420px] xl:w-[520px] object-contain drop-shadow-2xl animate-pulse"
              />

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;
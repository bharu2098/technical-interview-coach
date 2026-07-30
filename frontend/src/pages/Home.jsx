import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <section className="max-w-7xl mx-auto py-24 px-6">

        <h2 className="text-4xl font-bold text-center mb-16">
          Why Choose Us?
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          <Card
            icon="🤖"
            title="AI Interviewer"
            description="Practice realistic interviews generated using AI."
          />

          <Card
            icon="📊"
            title="Performance Reports"
            description="Receive detailed reports with scores, strengths and improvement areas."
          />

          <Card
  icon="📝"
  title="AI Answer Evaluation"
  description="Get intelligent AI feedback on your answers with strengths, weaknesses, and improvement suggestions."
/>

        </div>

      </section>

      <section className="bg-slate-100 py-24">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-14">
            Platform Statistics
          </h2>

          <div className="grid md:grid-cols-4 gap-8 text-center">

            <div>
              <h3 className="text-5xl font-bold text-blue-600">1000+</h3>
              <p className="mt-3 text-slate-600">
                Interviews Conducted
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-blue-600">95%</h3>
              <p className="mt-3 text-slate-600">
                User Satisfaction
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-blue-600">500+</h3>
              <p className="mt-3 text-slate-600">
                AI Questions
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-blue-600">24/7</h3>
              <p className="mt-3 text-slate-600">
                AI Availability
              </p>
            </div>

          </div>

        </div>

      </section>

      <Footer />

    </>
  );
}

export default Home;
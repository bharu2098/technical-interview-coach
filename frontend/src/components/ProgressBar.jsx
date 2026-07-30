function ProgressBar({ currentQuestion, totalQuestions }) {
  const percentage =
    (currentQuestion / totalQuestions) * 100;

  return (
    <div className="bg-white rounded-xl shadow p-5">

      <div className="flex justify-between mb-3">

        <span className="font-semibold">
          Progress
        </span>

        <span className="font-bold text-blue-600">
          {currentQuestion} / {totalQuestions}
        </span>

      </div>

      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">

        <div
          className="h-full bg-blue-600 transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}

export default ProgressBar;
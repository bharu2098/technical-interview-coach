function InterviewControls({
  onPrevious,
  onSubmit,
  onNext,
  onFinish,
  disablePrevious,
  disableNext,
  loading,
}) {
  return (
    <div className="flex flex-wrap justify-between gap-4">

      <button
        onClick={onPrevious}
        disabled={disablePrevious}
        className="
        px-6
        py-3
        rounded-lg
        bg-gray-500
        text-white
        disabled:opacity-50
        "
      >
        Previous
      </button>

      <button
        onClick={onSubmit}
        disabled={loading}
        className="
        px-6
        py-3
        rounded-lg
        bg-blue-600
        text-white
        hover:bg-blue-700
        "
      >
        {loading
          ? "Evaluating..."
          : "Submit Answer"}
      </button>

      {!disableNext ? (
        <button
          onClick={onNext}
          className="
          px-6
          py-3
          rounded-lg
          bg-green-600
          text-white
          hover:bg-green-700
          "
        >
          Next
        </button>
      ) : (
        <button
          onClick={onFinish}
          className="
          px-6
          py-3
          rounded-lg
          bg-purple-600
          text-white
          hover:bg-purple-700
          "
        >
          Finish Interview
        </button>
      )}

    </div>
  );
}

export default InterviewControls;
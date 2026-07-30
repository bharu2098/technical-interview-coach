function AnswerBox({
  answer,
  setAnswer,
}) {
  return (
    <textarea
      rows={8}
      value={answer}
      onChange={(e) =>
        setAnswer(e.target.value)
      }
      placeholder="Write your answer here..."
      className="
      w-full
      rounded-xl
      border
      border-gray-300
      p-4
      text-lg
      resize-none
      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
      "
    />
  );
}

export default AnswerBox;
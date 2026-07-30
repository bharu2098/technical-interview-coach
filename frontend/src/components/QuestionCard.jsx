function QuestionCard({
  question,
  difficulty,
}) {
  return (
    <div>

      <div className="flex justify-between mb-5">

        <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full">

          Technical Question

        </span>

        <span className="bg-orange-100 text-orange-700 px-4 py-1 rounded-full">

          {difficulty}

        </span>

      </div>

      <p className="text-xl leading-8 text-gray-800">

        {question}

      </p>

    </div>
  );
}

export default QuestionCard;
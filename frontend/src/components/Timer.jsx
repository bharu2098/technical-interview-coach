import { useEffect, useState } from "react";

function Timer({ initialTime }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);

  const seconds = timeLeft % 60;

  return (
    <div className="bg-red-50 border border-red-300 rounded-xl p-5 shadow">

      <h3 className="text-xl font-bold text-red-700">
        Time Remaining
      </h3>

      <p className="text-4xl font-bold mt-2">

        {minutes.toString().padStart(2, "0")}:

        {seconds.toString().padStart(2, "0")}

      </p>

    </div>
  );
}

export default Timer;
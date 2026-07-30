function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50">

      <div className="flex flex-col items-center">

        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

        <p className="mt-5 text-slate-600 font-medium">
          Loading...
        </p>

      </div>

    </div>
  );
}

export default Loading;
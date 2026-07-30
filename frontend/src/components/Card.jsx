function Card({ icon, title, description }) {
  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-8 border border-slate-100 hover:-translate-y-2">

      <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-100 text-4xl mb-6 group-hover:scale-110 transition">
        {icon}
      </div>

      <h3 className="text-2xl font-bold text-slate-800 mb-4">
        {title}
      </h3>

      <p className="text-slate-600 leading-7">
        {description}
      </p>

    </div>
  );
}

export default Card;
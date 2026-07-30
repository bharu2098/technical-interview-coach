function StatsCard({
  title,
  value,
  icon,
  color,
  subtitle,
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className={`mt-3 text-4xl font-bold ${color}`}>
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-slate-400">
              {subtitle}
            </p>
          )}

        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-3xl transition group-hover:scale-110">
          {icon}
        </div>

      </div>

    </div>
  );
}

export default StatsCard;
function SummaryCards({ totalExpense, totalCategories, totalRecords }) {
  const cards = [
    {
      label: "Total Spent",
      value: `₹ ${totalExpense.toLocaleString("en-IN")}`,
      icon: "📉",
      gradient: "from-rose-500/20 to-red-600/10",
      border: "border-rose-500/30",
      accent: "text-rose-400",
      glow: "shadow-rose-500/10",
      bar: "bg-gradient-to-r from-rose-500 to-red-500",
    },
    {
      label: "Categories",
      value: totalCategories,
      icon: "🗂️",
      gradient: "from-violet-500/20 to-indigo-600/10",
      border: "border-violet-500/30",
      accent: "text-violet-400",
      glow: "shadow-violet-500/10",
      bar: "bg-gradient-to-r from-violet-500 to-indigo-500",
    },
    {
      label: "Total Records",
      value: totalRecords,
      icon: "📋",
      gradient: "from-emerald-500/20 to-teal-600/10",
      border: "border-emerald-500/30",
      accent: "text-emerald-400",
      glow: "shadow-emerald-500/10",
      bar: "bg-gradient-to-r from-emerald-500 to-teal-500",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-5 mb-8">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`relative bg-gradient-to-br ${card.gradient} border ${card.border} rounded-2xl p-6 shadow-xl ${card.glow} hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/3 -translate-y-8 translate-x-8" />

          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm font-medium tracking-wide uppercase mb-1">
                {card.label}
              </p>
              <p className={`text-3xl font-bold ${card.accent}`}>
                {card.value}
              </p>
            </div>
            <span className="text-2xl">{card.icon}</span>
          </div>

          {/* Bottom accent bar */}
          <div className={`h-1 ${card.bar} rounded-full opacity-60`} />
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;
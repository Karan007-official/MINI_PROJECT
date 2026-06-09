const CATEGORY_COLORS = {
  default: { bg: "bg-violet-500/15", text: "text-violet-300", border: "border-violet-500/30" },
  Food: { bg: "bg-orange-500/15", text: "text-orange-300", border: "border-orange-500/30" },
  Travel: { bg: "bg-sky-500/15", text: "text-sky-300", border: "border-sky-500/30" },
  Shopping: { bg: "bg-pink-500/15", text: "text-pink-300", border: "border-pink-500/30" },
  Bills: { bg: "bg-red-500/15", text: "text-red-300", border: "border-red-500/30" },
  Health: { bg: "bg-emerald-500/15", text: "text-emerald-300", border: "border-emerald-500/30" },
  Entertainment: { bg: "bg-amber-500/15", text: "text-amber-300", border: "border-amber-500/30" },
};

function getCategoryStyle(category) {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS.default;
}

function ExpenseTable({ expenses, deleteExpense }) {
  if (expenses.length === 0) {
    return (
      <div className="bg-gray-900/60 border border-white/10 rounded-2xl p-16 text-center shadow-xl">
        <span className="text-5xl mb-4 block">🧾</span>
        <p className="text-gray-400 font-medium">No expenses yet</p>
        <p className="text-gray-600 text-sm mt-1">Add your first expense above</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/60 border border-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-violet-400 shadow-sm shadow-violet-400/50" />
        <h3 className="text-white font-semibold">Expense Records</h3>
        <span className="ml-auto bg-white/5 border border-white/10 text-gray-400 text-xs font-medium px-3 py-1 rounded-full">
          {expenses.length} entries
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left text-xs text-gray-500 font-semibold uppercase tracking-widest px-6 py-3">
                Title
              </th>
              <th className="text-left text-xs text-gray-500 font-semibold uppercase tracking-widest px-6 py-3">
                Amount
              </th>
              <th className="text-left text-xs text-gray-500 font-semibold uppercase tracking-widest px-6 py-3">
                Category
              </th>
              <th className="text-left text-xs text-gray-500 font-semibold uppercase tracking-widest px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {expenses.map((expense, idx) => {
              const catStyle = getCategoryStyle(expense.category);
              return (
                <tr
                  key={expense.id}
                  className="hover:bg-white/3 transition-colors duration-150 group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sm font-bold text-gray-400 group-hover:bg-violet-500/10 group-hover:text-violet-400 transition-colors">
                        {expense.title?.charAt(0)?.toUpperCase()}
                      </div>
                      <span className="text-gray-200 font-medium text-sm">{expense.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-emerald-400 font-bold text-sm">
                      ₹ {Number(expense.amount).toLocaleString("en-IN")}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 ${catStyle.bg} ${catStyle.text} border ${catStyle.border} text-xs font-medium px-3 py-1.5 rounded-full`}>
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteExpense(expense.id)}
                      className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/50 text-red-400 hover:text-red-300 text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpenseTable;
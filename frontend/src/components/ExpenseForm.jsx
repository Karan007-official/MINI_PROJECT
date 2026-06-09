function ExpenseForm({
  title, amount, categoryId,
  setTitle, setAmount, setCategoryId,
  categories, addExpense,
}) {
  return (
    <div className="bg-gray-900/60 border border-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-xl">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
          <span className="text-sm">➕</span>
        </div>
        <h2 className="text-white font-semibold text-lg">Add New Expense</h2>
      </div>

      <div className="grid md:grid-cols-4 gap-3">
        {/* Title Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Expense title"
            className="w-full bg-gray-800/60 border border-white/10 text-white placeholder-gray-500 p-3 pl-4 rounded-xl outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all duration-200 text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Amount Input */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">₹</span>
          <input
            type="number"
            placeholder="0.00"
            className="w-full bg-gray-800/60 border border-white/10 text-white placeholder-gray-500 p-3 pl-7 rounded-xl outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all duration-200 text-sm"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* Category Select */}
        <select
          className="w-full bg-gray-800/60 border border-white/10 text-gray-300 p-3 rounded-xl outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all duration-200 text-sm cursor-pointer appearance-none"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="" className="bg-gray-800">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id} className="bg-gray-800">
              {cat.name}
            </option>
          ))}
        </select>

        {/* Add Button */}
        <button
          onClick={addExpense}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl font-semibold text-sm py-3 px-6 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
}

export default ExpenseForm;
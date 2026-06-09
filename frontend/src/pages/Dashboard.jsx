import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const API = "http://localhost:5000";

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }
    fetchCategories();
    fetchExpenses();
  }, []);

  const fetchCategories = async () => {
    const res = await axios.get(`${API}/categories`);
    setCategories(res.data);
  };

  const fetchExpenses = async () => {
    const res = await axios.get(`${API}/expenses/${userId}`);
    setExpenses(res.data);
  };

  const addExpense = async () => {
    if (!title || !amount || !categoryId) {
      alert("Fill all fields");
      return;
    }
    await axios.post(`${API}/expenses`, {
      user_id: userId,
      title,
      amount,
      category_id: categoryId,
    });
    setTitle("");
    setAmount("");
    setCategoryId("");
    fetchExpenses();
  };

  const deleteExpense = async (id) => {
    await axios.delete(`${API}/expenses/${id}`);
    fetchExpenses();
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const filteredExpenses = expenses.filter((e) => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      filterCategory === "" ? true : e.category === filterCategory;
    return matchSearch && matchCategory;
  });

  const totalExpense = expenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0,
  );

  const CATEGORY_COLORS = {
    default: {
      bg: "bg-violet-500/15",
      text: "text-violet-300",
      border: "border-violet-500/30",
    },
    Food: {
      bg: "bg-orange-500/15",
      text: "text-orange-300",
      border: "border-orange-500/30",
    },
    Travel: {
      bg: "bg-sky-500/15",
      text: "text-sky-300",
      border: "border-sky-500/30",
    },
    Shopping: {
      bg: "bg-pink-500/15",
      text: "text-pink-300",
      border: "border-pink-500/30",
    },
    Bills: {
      bg: "bg-red-500/15",
      text: "text-red-300",
      border: "border-red-500/30",
    },
    Health: {
      bg: "bg-emerald-500/15",
      text: "text-emerald-300",
      border: "border-emerald-500/30",
    },
    Entertainment: {
      bg: "bg-amber-500/15",
      text: "text-amber-300",
      border: "border-amber-500/30",
    },
  };
  const getCategoryStyle = (cat) =>
    CATEGORY_COLORS[cat] || CATEGORY_COLORS.default;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Subtle background grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-white/10 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <span className="text-lg">💰</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-none tracking-tight">
                SpendSmart
              </h1>
              <p className="text-violet-400 text-xs font-medium tracking-widest uppercase">
                Expense Tracker
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-xs font-bold text-white">
                {userName?.charAt(0)?.toUpperCase()}
              </div>
              <span className="text-gray-300 text-sm font-medium">
                {userName}
              </span>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/60 text-red-400 hover:text-red-300 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="relative max-w-7xl mx-auto px-6 py-8">
        {/* SUMMARY CARDS */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {[
            {
              label: "Total Spent",
              value: `₹ ${totalExpense.toLocaleString("en-IN")}`,
              icon: "📉",
              gradient: "from-rose-500/20 to-red-600/10",
              border: "border-rose-500/30",
              accent: "text-rose-400",
              bar: "bg-gradient-to-r from-rose-500 to-red-500",
            },
            {
              label: "Categories",
              value: categories.length,
              icon: "🗂️",
              gradient: "from-violet-500/20 to-indigo-600/10",
              border: "border-violet-500/30",
              accent: "text-violet-400",
              bar: "bg-gradient-to-r from-violet-500 to-indigo-500",
            },
            {
              label: "Total Records",
              value: expenses.length,
              icon: "📋",
              gradient: "from-emerald-500/20 to-teal-600/10",
              border: "border-emerald-500/30",
              accent: "text-emerald-400",
              bar: "bg-gradient-to-r from-emerald-500 to-teal-500",
            },
          ].map((card, i) => (
            <div
              key={i}
              className={`relative bg-gradient-to-br ${card.gradient} border ${card.border} rounded-2xl p-6 shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/3 -translate-y-8 translate-x-8" />
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-1">
                    {card.label}
                  </p>
                  <p className={`text-3xl font-bold ${card.accent}`}>
                    {card.value}
                  </p>
                </div>
                <span className="text-2xl">{card.icon}</span>
              </div>
              <div className={`h-1 ${card.bar} rounded-full opacity-60`} />
            </div>
          ))}
        </div>

        {/* ADD EXPENSE FORM */}
        <div className="bg-gray-900/60 border border-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-sm">
              ➕
            </div>
            <h2 className="text-white font-semibold text-lg">
              Add New Expense
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-3">
            <input
              type="text"
              placeholder="Expense title"
              className="bg-gray-800/60 border border-white/10 text-white placeholder-gray-500 p-3 rounded-xl outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all duration-200 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
                ₹
              </span>
              <input
                type="number"
                placeholder="0.00"
                className="w-full bg-gray-800/60 border border-white/10 text-white placeholder-gray-500 p-3 pl-7 rounded-xl outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all duration-200 text-sm"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <select
              className="bg-gray-800/60 border border-white/10 text-gray-300 p-3 rounded-xl outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all duration-200 text-sm cursor-pointer"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="" className="bg-gray-800">
                Select Category
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.id} className="bg-gray-800">
                  {c.name}
                </option>
              ))}
            </select>
            <button
              onClick={addExpense}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl font-semibold text-sm py-3 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-200 hover:-translate-y-0.5"
            >
              Add Expense
            </button>
          </div>
        </div>

        {/* SEARCH & FILTER */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              className="w-full bg-gray-900/60 border border-white/10 text-white placeholder-gray-500 p-3 pl-10 rounded-xl outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all text-sm"
              placeholder="Search expenses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="bg-gray-900/60 border border-white/10 text-gray-300 p-3 rounded-xl outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all text-sm cursor-pointer min-w-40"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="" className="bg-gray-900">
              All Categories
            </option>
            {categories.map((c) => (
              <option key={c.id} value={c.name} className="bg-gray-900">
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* EXPENSE TABLE */}
        {filteredExpenses.length === 0 ? (
          <div className="bg-gray-900/60 border border-white/10 rounded-2xl p-16 text-center">
            <span className="text-5xl mb-4 block">🧾</span>
            <p className="text-gray-400 font-medium">No expenses found</p>
            <p className="text-gray-600 text-sm mt-1">
              {search
                ? "Try a different search"
                : "Add your first expense above"}
            </p>
          </div>
        ) : (
          <div className="bg-gray-900/60 border border-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl">
            <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-violet-400 shadow-sm shadow-violet-400/50" />
              <h3 className="text-white font-semibold">Expense Records</h3>
              <span className="ml-auto bg-white/5 border border-white/10 text-gray-400 text-xs font-medium px-3 py-1 rounded-full">
                {filteredExpenses.length} entries
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    {["Title", "Amount", "Category", "Action"].map((h) => (
                      <th
                        key={h}
                        className="text-left text-xs text-gray-500 font-semibold uppercase tracking-widest px-6 py-3"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredExpenses.map((e) => {
                    const cs = getCategoryStyle(e.category);
                    return (
                      <tr
                        key={e.id}
                        className="hover:bg-white/3 transition-colors duration-150 group"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sm font-bold text-gray-400 group-hover:bg-violet-500/10 group-hover:text-violet-400 transition-colors">
                              {e.title?.charAt(0)?.toUpperCase()}
                            </div>
                            <span className="text-gray-200 font-medium text-sm">
                              {e.title}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-emerald-400 font-bold text-sm">
                            ₹ {Number(e.amount).toLocaleString("en-IN")}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center ${cs.bg} ${cs.text} border ${cs.border} text-xs font-medium px-3 py-1.5 rounded-full`}
                          >
                            {e.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => deleteExpense(e.id)}
                            className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/50 text-red-400 hover:text-red-300 text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200"
                          >
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
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
        )}
      </div>
    </div>
  );
}

export default Dashboard;

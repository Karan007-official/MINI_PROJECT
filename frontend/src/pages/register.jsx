import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) { setError("Password must be at least 6 characters"); return; }
    if (formData.password !== formData.confirmPassword) { setError("Passwords do not match"); return; }
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/register", {
        name: formData.name, email: formData.email, password: formData.password,
      });
      if (res.data.success) { alert("Registration Successful! Please login."); navigate("/"); }
      else { setError(res.data.message); }
    } catch { setError("Server error. Please try again."); }
    finally { setLoading(false); }
  };

  const passwordStrength = () => {
    const p = formData.password;
    if (!p) return null;
    if (p.length < 6) return { label: "Too short", color: "bg-red-500", width: "w-1/4" };
    if (p.length < 8) return { label: "Weak", color: "bg-orange-500", width: "w-2/4" };
    if (p.length < 12) return { label: "Good", color: "bg-yellow-500", width: "w-3/4" };
    return { label: "Strong", color: "bg-emerald-500", width: "w-full" };
  };
  const strength = passwordStrength();

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      {/* Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(139,92,246,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.04)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        <div className="bg-gray-900/80 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/30">
              <span className="text-2xl">🚀</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Create account</h1>
            <p className="text-gray-400 text-sm mt-1">Join SpendSmart and track your expenses</p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-2 block">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your Name"
                className="w-full bg-gray-800/60 border border-white/10 text-white placeholder-gray-600 p-3.5 rounded-xl outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all duration-200 text-sm"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-2 block">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full bg-gray-800/60 border border-white/10 text-white placeholder-gray-600 p-3.5 rounded-xl outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all duration-200 text-sm"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-2 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Min. 6 characters"
                  className="w-full bg-gray-800/60 border border-white/10 text-white placeholder-gray-600 p-3.5 pr-12 rounded-xl outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all duration-200 text-sm"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {showPassword
                      ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      : <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>
                    }
                  </svg>
                </button>
              </div>
              {/* Password strength bar */}
              {strength && (
                <div className="mt-2">
                  <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div className={`h-full ${strength.color} ${strength.width} transition-all duration-300 rounded-full`} />
                  </div>
                  <p className={`text-xs mt-1 ${strength.color.replace("bg-", "text-")}`}>{strength.label}</p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-2 block">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Repeat your password"
                className={`w-full bg-gray-800/60 border text-white placeholder-gray-600 p-3.5 rounded-xl outline-none focus:ring-1 transition-all duration-200 text-sm ${
                  formData.confirmPassword && formData.confirmPassword !== formData.password
                    ? "border-red-500/50 focus:border-red-500/60 focus:ring-red-500/30"
                    : formData.confirmPassword && formData.confirmPassword === formData.password
                    ? "border-emerald-500/50 focus:border-emerald-500/60 focus:ring-emerald-500/30"
                    : "border-white/10 focus:border-violet-500/60 focus:ring-violet-500/30"
                }`}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {formData.confirmPassword && formData.confirmPassword === formData.password && (
                <p className="text-emerald-400 text-xs mt-1">✓ Passwords match</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-200 hover:-translate-y-0.5 mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating account...
                </span>
              ) : "Create Account"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-500 text-sm">
            Already have an account?{" "}
            <Link to="/" className="text-violet-400 hover:text-violet-300 font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
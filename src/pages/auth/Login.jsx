import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate(location.state?.from?.pathname || "/dashboard");
    } catch {
      setError("Incorrect email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto px-6 py-20">
      <h1 className="font-display text-3xl text-ink mb-8">Sign in</h1>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label className="text-sm text-ink/70 block mb-1" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange}
            className="w-full border border-ink/20 px-3 py-2 focus:outline-none focus:border-brass-500" />
        </div>
        <div>
          <label className="text-sm text-ink/70 block mb-1" htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value={form.password} onChange={handleChange}
            className="w-full border border-ink/20 px-3 py-2 focus:outline-none focus:border-brass-500" />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={loading}
          className="w-full bg-brass-500 text-pine-950 px-8 py-3 text-sm uppercase tracking-widest hover:bg-brass-400 transition-colors disabled:opacity-50">
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <div className="flex justify-between text-sm mt-6">
        <Link to="/register" className="text-brass-600">Create an account</Link>
        <Link to="/forgot-password" className="text-ink/60 hover:text-brass-600">Forgot password?</Link>
      </div>
    </div>
  );
}

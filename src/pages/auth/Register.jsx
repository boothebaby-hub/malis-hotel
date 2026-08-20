import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) return setError("Enter your name");
    if (form.password.length < 6) return setError("Password must be at least 6 characters");

    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto px-6 py-20">
      <h1 className="font-display text-3xl text-ink mb-8">Create an account</h1>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label className="text-sm text-ink/70 block mb-1" htmlFor="name">Name</label>
          <input id="name" name="name" value={form.name} onChange={handleChange}
            className="w-full border border-ink/20 px-3 py-2 focus:outline-none focus:border-brass-500" />
        </div>
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
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>
      <p className="text-sm text-ink/60 mt-6">
        Already have an account? <Link to="/login" className="text-brass-600">Sign in</Link>
      </p>
    </div>
  );
}

function friendlyError(code) {
  switch (code) {
    case "auth/email-already-in-use":
      return "An account with that email already exists.";
    case "auth/invalid-email":
      return "Enter a valid email address.";
    case "auth/weak-password":
      return "Password is too weak.";
    default:
      return "Something went wrong. Please try again.";
  }
}

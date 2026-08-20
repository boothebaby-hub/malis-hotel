import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
    } catch {
      setError("Couldn't send reset email. Check the address and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="max-w-sm mx-auto px-6 py-24 text-center">
        <p className="font-display text-2xl text-ink mb-3">Check your email</p>
        <p className="text-ink/70">We sent a password reset link to {email}.</p>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto px-6 py-20">
      <h1 className="font-display text-3xl text-ink mb-4">Reset password</h1>
      <p className="text-sm text-ink/60 mb-6">Enter your account email and we'll send a reset link.</p>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border border-ink/20 px-3 py-2 focus:outline-none focus:border-brass-500"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={loading}
          className="w-full bg-brass-500 text-pine-950 px-8 py-3 text-sm uppercase tracking-widest hover:bg-brass-400 transition-colors disabled:opacity-50">
          {loading ? "Sending…" : "Send reset link"}
        </button>
      </form>
      <p className="text-sm text-ink/60 mt-6">
        <Link to="/login" className="text-brass-600">Back to sign in</Link>
      </p>
    </div>
  );
}

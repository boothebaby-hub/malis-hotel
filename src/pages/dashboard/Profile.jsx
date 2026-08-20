import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { usersApi } from "../../services/firestore";

export default function Profile() {
  const { user, profile } = useAuth();
  const [name, setName] = useState(profile?.name || "");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!name.trim()) return setError("Name can't be empty");
    try {
      await usersApi.update(user.uid, { name });
      setSaved(true);
    } catch {
      setError("Couldn't save changes.");
    }
  }

  return (
    <div className="max-w-sm mx-auto px-6 py-16">
      <h1 className="font-display text-3xl text-ink mb-8">Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label className="text-sm text-ink/70 block mb-1">Email</label>
          <input value={user.email} disabled className="w-full border border-ink/10 bg-ink/5 px-3 py-2 text-ink/50" />
        </div>
        <div>
          <label className="text-sm text-ink/70 block mb-1">Name</label>
          <input value={name} onChange={(e) => { setName(e.target.value); setSaved(false); }}
            className="w-full border border-ink/20 px-3 py-2 focus:outline-none focus:border-brass-500" />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {saved && <p className="text-sm text-brass-600">Saved.</p>}
        <button type="submit"
          className="bg-brass-500 text-pine-950 px-8 py-3 text-sm uppercase tracking-widest hover:bg-brass-400 transition-colors">
          Save changes
        </button>
      </form>
    </div>
  );
}

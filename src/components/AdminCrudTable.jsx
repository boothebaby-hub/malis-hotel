import { useEffect, useState } from "react";

/**
 * Generic admin CRUD table.
 * fields: [{ key, label, type: "text" | "number" | "textarea" }]
 */
export default function AdminCrudTable({ title, api, fields, emptyItem }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyItem);
  const [showForm, setShowForm] = useState(false);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await api.list();
      setItems(data);
    } catch {
      setError("Couldn't load data. Check your Firestore connection.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function startAdd() {
    setForm(emptyItem);
    setEditingId(null);
    setShowForm(true);
  }

  function startEdit(item) {
    setForm(item);
    setEditingId(item.id);
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editingId) {
        await api.update(editingId, form);
      } else {
        await api.create(form);
      }
      setShowForm(false);
      await load();
    } catch {
      setError("Save failed. Please try again.");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this item?")) return;
    try {
      await api.remove(id);
      await load();
    } catch {
      setError("Delete failed. Please try again.");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl text-ink">{title}</h2>
        <button
          onClick={startAdd}
          className="bg-brass-500 text-pine-950 px-5 py-2 text-sm uppercase tracking-widest hover:bg-brass-400 transition-colors"
        >
          Add new
        </button>
      </div>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      {showForm && (
        <form onSubmit={handleSubmit} className="border border-ink/10 p-6 mb-8 space-y-4 bg-white">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="text-sm text-ink/70 block mb-1">{f.label}</label>
              {f.type === "textarea" ? (
                <textarea
                  rows={3}
                  value={form[f.key] ?? ""}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className="w-full border border-ink/20 px-3 py-2 focus:outline-none focus:border-brass-500"
                />
              ) : (
                <input
                  type={f.type}
                  value={form[f.key] ?? ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value,
                    })
                  }
                  className="w-full border border-ink/20 px-3 py-2 focus:outline-none focus:border-brass-500"
                />
              )}
            </div>
          ))}
          <div className="flex gap-3">
            <button type="submit" className="bg-brass-500 text-pine-950 px-6 py-2 text-sm uppercase tracking-widest hover:bg-brass-400">
              Save
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="border border-ink/20 px-6 py-2 text-sm uppercase tracking-widest hover:border-ink/40"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-ink/60">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-ink/60">Nothing here yet.</p>
      ) : (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-ink/15 text-left text-ink/60">
              {fields.map((f) => (
                <th key={f.key} className="py-2 pr-4">{f.label}</th>
              ))}
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-ink/5">
                {fields.map((f) => (
                  <td key={f.key} className="py-3 pr-4 text-ink/80">
                    {String(item[f.key] ?? "")}
                  </td>
                ))}
                <td className="py-3 text-right space-x-3">
                  <button onClick={() => startEdit(item)} className="text-pine-700 hover:text-brass-600">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

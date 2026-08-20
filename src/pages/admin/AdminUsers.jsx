import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { usersApi } from "../../services/firestore";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      setUsers(await usersApi.list());
    } catch {
      setError("Couldn't load users.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleRoleChange(id, role) {
    await usersApi.update(id, { role });
    load();
  }

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl text-ink mb-6">Users</h1>
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
      {loading ? (
        <p className="text-ink/60">Loading…</p>
      ) : (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-ink/15 text-left text-ink/60">
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Email</th>
              <th className="py-2 pr-4">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-ink/5">
                <td className="py-3 pr-4 text-ink/80">{u.name}</td>
                <td className="py-3 pr-4 text-ink/80">{u.email}</td>
                <td className="py-3 pr-4">
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                    className="border border-ink/20 px-2 py-1"
                  >
                    <option value="guest">Guest</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  );
}
 
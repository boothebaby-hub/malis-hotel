import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { reservationsApi } from "../../services/firestore";

export default function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      setReservations(await reservationsApi.list());
    } catch {
      setError("Couldn't load reservations.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCancel(id) {
    await reservationsApi.cancel(id);
    load();
  }

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl text-ink mb-6">Reservations</h1>
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
      {loading ? (
        <p className="text-ink/60">Loading…</p>
      ) : reservations.length === 0 ? (
        <p className="text-ink/60">No reservations yet.</p>
      ) : (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-ink/15 text-left text-ink/60">
              <th className="py-2 pr-4">Room</th>
              <th className="py-2 pr-4">Check in</th>
              <th className="py-2 pr-4">Check out</th>
              <th className="py-2 pr-4">Guests</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r.id} className="border-b border-ink/5">
                <td className="py-3 pr-4 text-ink/80">{r.roomId}</td>
                <td className="py-3 pr-4 text-ink/80">{r.checkIn}</td>
                <td className="py-3 pr-4 text-ink/80">{r.checkOut}</td>
                <td className="py-3 pr-4 text-ink/80">{r.guests}</td>
                <td className="py-3 pr-4 text-ink/80 capitalize">{r.status}</td>
                <td className="py-3 text-right">
                  {r.status !== "cancelled" && (
                    <button onClick={() => handleCancel(r.id)} className="text-red-600 hover:text-red-800">
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  );
}

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { reservationsApi } from "../../services/firestore";
import { rooms } from "../../services/mockData";

export default function MyReservations() {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      setReservations(await reservationsApi.listForUser(user.uid));
    } catch (err) {
      console.error("Failed to load reservations:", err);
      setError("Couldn't load your reservations.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCancel(id) {
    if (!confirm("Cancel this reservation?")) return;
    await reservationsApi.cancel(id);
    load();
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-display text-3xl text-ink mb-8">My reservations</h1>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      {loading ? (
        <p className="text-ink/60">Loading…</p>
      ) : reservations.length === 0 ? (
        <p className="text-ink/60">No reservations yet.</p>
      ) : (
        <div className="space-y-4">
          {reservations.map((r) => {
            const room = rooms.find((x) => x.id === r.roomId);
            return (
              <div key={r.id} className="border border-ink/10 p-5 flex items-center justify-between">
                <div>
                  <p className="font-display text-lg text-ink">{room?.name || r.roomId}</p>
                  <p className="text-sm text-ink/60">
                    {r.checkIn} → {r.checkOut} · {r.guests} guest{r.guests > 1 ? "s" : ""}
                  </p>
                  <p className="text-sm text-ink/60 capitalize">Status: {r.status}</p>
                </div>
                {r.status !== "cancelled" && (
                  <button onClick={() => handleCancel(r.id)} className="text-sm text-red-600 hover:text-red-800">
                    Cancel
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

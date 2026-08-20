import { useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { reservationsApi } from "../../services/firestore";
import { rooms } from "../../services/mockData";

function nightsBetween(checkIn, checkOut) {
  const inD = new Date(checkIn);
  const outD = new Date(checkOut);
  const diff = (outD - inD) / (1000 * 60 * 60 * 24);
  return Number.isFinite(diff) && diff > 0 ? diff : 0;
}

export default function MakeReservation() {
  const { roomId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const room = rooms.find((r) => r.id === roomId);

  const [form, setForm] = useState({ checkIn: "", checkOut: "", guests: 1 });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!room) return <Navigate to="/rooms" replace />;

  const nights = nightsBetween(form.checkIn, form.checkOut);
  const total = nights * room.price;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.checkIn || !form.checkOut) return setError("Choose your check-in and check-out dates");
    if (nights <= 0) return setError("Check-out must be after check-in");
    if (Number(form.guests) > room.capacity) return setError(`This room sleeps up to ${room.capacity} guests`);

    setLoading(true);
    try {
      await reservationsApi.create({
        userId: user.uid,
        roomId: room.id,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        guests: Number(form.guests),
        totalPrice: total,
      });
      navigate("/dashboard/reservations");
    } catch {
      setError("Couldn't complete the reservation. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto px-6 py-16">
      <h1 className="font-display text-3xl text-ink mb-1">Reserve {room.name}</h1>
      <p className="text-ink/60 mb-8">${room.price} / night · sleeps up to {room.capacity}</p>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-ink/70 block mb-1">Check in</label>
            <input type="date" name="checkIn" value={form.checkIn} onChange={handleChange}
              className="w-full border border-ink/20 px-3 py-2 focus:outline-none focus:border-brass-500" />
          </div>
          <div>
            <label className="text-sm text-ink/70 block mb-1">Check out</label>
            <input type="date" name="checkOut" value={form.checkOut} onChange={handleChange}
              className="w-full border border-ink/20 px-3 py-2 focus:outline-none focus:border-brass-500" />
          </div>
        </div>
        <div>
          <label className="text-sm text-ink/70 block mb-1">Guests</label>
          <input type="number" name="guests" min="1" max={room.capacity} value={form.guests} onChange={handleChange}
            className="w-full border border-ink/20 px-3 py-2 focus:outline-none focus:border-brass-500" />
        </div>

        {nights > 0 && (
          <p className="text-sm text-ink/70">
            {nights} night{nights > 1 ? "s" : ""} · <span className="text-brass-600">${total} total</span>
          </p>
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button type="submit" disabled={loading}
          className="w-full bg-brass-500 text-pine-950 px-8 py-3 text-sm uppercase tracking-widest hover:bg-brass-400 transition-colors disabled:opacity-50">
          {loading ? "Booking…" : "Confirm reservation"}
        </button>
      </form>
    </div>
  );
}

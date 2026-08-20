import { useParams, Link, Navigate } from "react-router-dom";
import { rooms } from "../services/mockData";

export default function RoomDetails() {
  const { id } = useParams();
  const room = rooms.find((r) => r.id === id);

  if (!room) return <Navigate to="/rooms" replace />;

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <Link to="/rooms" className="text-sm text-pine-700 hover:text-brass-600">
        ← Back to rooms
      </Link>

      <img
        src={room.image}
        alt={room.name}
        className="w-full h-80 object-cover mt-6 border border-ink/10"
      />

      <div className="mt-6 flex items-baseline justify-between flex-wrap gap-2">
        <h1 className="font-display text-4xl text-ink">{room.name}</h1>
        <p className="text-2xl text-brass-600">${room.price}<span className="text-ink/50 text-base"> / night</span></p>
      </div>
      <p className="text-sm text-ink/60 mt-2">{room.size} · sleeps {room.capacity}</p>
      <p className="text-ink/70 mt-6 leading-relaxed max-w-2xl">{room.description}</p>

      <div className="mt-8">
        <p className="text-sm uppercase tracking-widest text-brass-600 mb-3">Amenities</p>
        <ul className="flex flex-wrap gap-2">
          {room.amenities.map((a) => (
            <li key={a} className="text-xs uppercase tracking-wide border border-ink/15 px-2 py-1 text-ink/60">
              {a}
            </li>
          ))}
        </ul>
      </div>

      <Link
        to={`/dashboard/reserve/${room.id}`}
        className="inline-block mt-10 bg-brass-500 text-pine-950 px-8 py-3 text-sm uppercase tracking-widest hover:bg-brass-400 transition-colors"
      >
        Reserve this room
      </Link>
    </div>
  );
}
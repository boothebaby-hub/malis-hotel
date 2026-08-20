import { Link } from "react-router-dom";
import { rooms } from "../services/mockData";

export default function Rooms() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <p className="text-brass-600 text-sm uppercase tracking-[0.2em] mb-4">Stay</p>
      <h1 className="font-display text-4xl text-ink mb-10">Rooms</h1>
      <div className="grid sm:grid-cols-2 gap-8">
        {rooms.map((room) => (
          <Link
            key={room.id}
            to={`/rooms/${room.id}`}
            className="block border border-ink/10 hover:border-brass-500 transition-colors"
          >
            <img
              src={room.image}
              alt={room.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-baseline justify-between">
                <p className="font-display text-xl text-ink">{room.name}</p>
                <p className="text-brass-600">${room.price}<span className="text-ink/50 text-sm"> / night</span></p>
              </div>
              <p className="text-sm text-ink/60 mt-1">{room.size} · sleeps {room.capacity}</p>
              <p className="text-ink/70 mt-4 leading-relaxed">{room.description}</p>
              <ul className="flex flex-wrap gap-2 mt-4">
                {room.amenities.map((a) => (
                  <li key={a} className="text-xs uppercase tracking-wide border border-ink/15 px-2 py-1 text-ink/60">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
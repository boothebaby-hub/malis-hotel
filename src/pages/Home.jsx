import { useState } from "react";
import { Link } from "react-router-dom";
import { rooms } from "../services/mockData";

export default function Home() {
  const [guests, setGuests] = useState("1");
  const [customGuests, setCustomGuests] = useState(4);
  
  return (
    <div>
      <section className="bg-pine-900 text-linen">
        <div className="max-w-6xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-brass-400 text-sm uppercase tracking-[0.2em] mb-4">
              Stay in Comfort. Experience More.
            </p>
            <h1 className="font-display text-5xl leading-tight mb-6">
              Welcome to Malis Hotel,
              <br /></h1>
              <h2>where modern comfort and unforgettable experiences come together.</h2>
            <p className="text-linen/70 text-lg leading-relaxed mb-8 max-w-md">
              Relax in comfort and enjoy a memorable stay with modern rooms, quality
              facilities, and friendly service at Malis Hotel.
            </p>
            <Link
              to="/rooms"
              className="inline-block bg-brass-500 text-pine-950 px-8 py-3 text-sm uppercase tracking-widest hover:bg-brass-400 transition-colors"
            >
              View rooms
            </Link>
          </div>
          <div className="border border-linen/15 p-8">
            <p className="font-display text-2xl mb-4">Check availability</p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <label className="text-sm">
                  Arrive
                  <input type="date" className="mt-1 w-full bg-transparent border border-linen/30 px-3 py-2 text-linen" />
                </label>
                <label className="text-sm">
                  Depart
                  <input type="date" className="mt-1 w-full bg-transparent border border-linen/30 px-3 py-2 text-linen" />
                </label>
              </div>
              <label className="text-sm block">
                Guests
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="mt-1 w-full bg-pine-900 border border-linen/30 px-3 py-2 text-linen"
                >
                  <option value="1">1 guest</option>
                  <option value="2">2 guests</option>
                  <option value="3">3 guests</option>
                  <option value="more">4+ guests</option>
                </select>

                {guests === "more" && (
                  <input
                    type="number"
                    min="4"
                    value={customGuests}
                    onChange={(e) => setCustomGuests(Number(e.target.value))}
                    className="mt-2 w-full bg-pine-900 border border-linen/30 px-3 py-2 text-linen"
                    placeholder="Number of guests"
                  />
                )}
              </label>
              <Link
                to="/rooms"
                className="block text-center border border-brass-500 text-brass-400 py-3 text-sm uppercase tracking-widest hover:bg-brass-500 hover:text-pine-950 transition-colors"
              >
                Search rooms
              </Link>
            </form>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="font-display text-3xl text-ink">Rooms</h2>
          <Link to="/rooms" className="text-sm text-pine-700 hover:text-brass-600">
            See all rooms →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rooms.map((room) => (
            <Link
              key={room.id}
              to={`/rooms/${room.id}`}
              className="block border border-ink/10 hover:border-brass-500 transition-colors p-5"
            >
              <p className="font-display text-lg text-ink">{room.name}</p>
              <p className="text-sm text-ink/60 mt-1">{room.size} · sleeps {room.capacity}</p>
              <p className="text-brass-600 mt-4">${room.price}<span className="text-ink/50 text-sm"> / night</span></p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

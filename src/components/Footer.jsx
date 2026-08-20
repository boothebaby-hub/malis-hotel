import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-pine-950 text-linen/70">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <p className="font-display text-lg text-linen">Malis Hotel</p>
          <p className="text-sm mt-2 leading-relaxed">
            Chroy Chongvar
            <br />
            Phnom Penh, Cambodia
          </p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-widest text-brass-400 mb-3">Explore</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/rooms" className="hover:text-linen">Rooms</Link></li>
            <li><Link to="/services" className="hover:text-linen">Services</Link></li>
            <li><Link to="/about" className="hover:text-linen">About</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm uppercase tracking-widest text-brass-400 mb-3">Reach us</p>
          <p className="text-sm">reservations@MalisHotel.example</p>
          <p className="text-sm mt-1">(+855) 85 343 083</p>
        </div>
      </div>
      <div className="border-t border-linen/10 py-4 text-center text-xs">
        © {new Date().getFullYear()} Malis Hotel
      </div>
    </footer>
  );
}

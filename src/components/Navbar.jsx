import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, profile, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Home"},
    { to: "/about", label: "About" },
    { to: "/rooms", label: "Rooms" },
    { to: "/services", label: "Services" },
    { to: "/contact", label: "Contact" },
  ];

  async function handleLogout() {
    await logout();
    setOpen(false);
    navigate("/");
  }

  const linkClass = ({ isActive }) =>
    `text-sm tracking-wide transition-colors ${
      isActive ? "text-brass-400" : "text-linen/80 hover:text-brass-400"
    }`;

  return (
    <header className="bg-pine-900 text-linen">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
        <Link to="/" className="font-display text-xl tracking-wide" onClick={() => setOpen(false)}>
          Malis Hotel
        </Link>

        <button
          className="md:hidden text-linen text-sm border border-linen/30 px-3 py-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className={linkClass}>{link.label}</NavLink>
              </li>
            ))}
            {user && isAdmin && (
              <li><Link to="/admin" className="text-sm tracking-wide text-linen/80 hover:text-brass-400">Admin</Link></li>
            )}
            {user ? (
              <>
                <li><Link to="/dashboard" className="text-sm tracking-wide text-linen/80 hover:text-brass-400">{profile?.name || "My account"}</Link></li>
                <li>
                  <button onClick={handleLogout}
                    className="text-sm tracking-wide border border-brass-500 text-brass-400 px-4 py-2 hover:bg-brass-500 hover:text-pine-950 transition-colors">
                    Sign out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login"
                  className="text-sm tracking-wide border border-brass-500 text-brass-400 px-4 py-2 hover:bg-brass-500 hover:text-pine-950 transition-colors">
                  Sign in
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>

      {open && (
        <nav className="md:hidden border-t border-linen/10 px-6 py-4">
          <ul className="space-y-4">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className={linkClass} onClick={() => setOpen(false)}>{link.label}</NavLink>
              </li>
            ))}
            {user && isAdmin && (
              <li><Link to="/admin" className="text-sm text-linen/80" onClick={() => setOpen(false)}>Admin</Link></li>
            )}
            {user ? (
              <>
                <li><Link to="/dashboard" className="text-sm text-linen/80" onClick={() => setOpen(false)}>{profile?.name || "My account"}</Link></li>
                <li><button onClick={handleLogout} className="text-sm text-brass-400">Sign out</button></li>
              </>
            ) : (
              <li><Link to="/login" className="text-sm text-brass-400" onClick={() => setOpen(false)}>Sign in</Link></li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}

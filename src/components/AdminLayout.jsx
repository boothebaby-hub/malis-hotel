import { NavLink } from "react-router-dom";

const links = [
  { to: "/admin", label: "Overview", end: true },
  { to: "/admin/rooms", label: "Rooms" },
  { to: "/admin/services", label: "Services" },
  { to: "/admin/products", label: "Products" },
  { to: "/admin/reservations", label: "Reservations" },
  { to: "/admin/users", label: "Users" },
];

export default function AdminLayout({ children }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-10">
      <nav className="space-y-1">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) =>
              `block text-sm px-3 py-2 ${
                isActive ? "bg-pine-900 text-linen" : "text-ink/70 hover:bg-ink/5"
              }`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
      <div>{children}</div>
    </div>
  );
}

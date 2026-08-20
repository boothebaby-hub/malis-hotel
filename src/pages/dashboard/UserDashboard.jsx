import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function UserDashboard() {
  const { profile } = useAuth();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-display text-3xl text-ink mb-2">Welcome{profile?.name ? `, ${profile.name}` : ""}</h1>
      <p className="text-ink/60 mb-10">Manage your stays and account details.</p>
      <div className="grid sm:grid-cols-2 gap-6">
        <Link to="/dashboard/reservations" className="border border-ink/10 hover:border-brass-500 p-6 block">
          <p className="font-display text-xl text-ink">My reservations</p>
          <p className="text-sm text-ink/60 mt-2">View upcoming and past stays, or cancel a booking.</p>
        </Link>
        <Link to="/rooms" className="border border-ink/10 hover:border-brass-500 p-6 block">
          <p className="font-display text-xl text-ink">Book a room</p>
          <p className="text-sm text-ink/60 mt-2">Browse rooms and reserve your next stay.</p>
        </Link>
        <Link to="/dashboard/profile" className="border border-ink/10 hover:border-brass-500 p-6 block">
          <p className="font-display text-xl text-ink">Profile</p>
          <p className="text-sm text-ink/60 mt-2">Update your account details.</p>
        </Link>
      </div>
    </div>
  );
}

import AdminLayout from "../../components/AdminLayout";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <h1 className="font-display text-3xl text-ink mb-4">Admin overview</h1>
      <p className="text-ink/70 max-w-xl leading-relaxed">
        Manage rooms, services, products, reservations, and users from the
        sections on the left. Changes here write directly to Firestore and
        are reflected on the public site immediately.
      </p>
    </AdminLayout>
  );
}

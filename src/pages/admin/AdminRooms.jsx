import AdminLayout from "../../components/AdminLayout";
import AdminCrudTable from "../../components/AdminCrudTable";
import { roomsApi } from "../../services/firestore";

const fields = [
  { key: "name", label: "Name", type: "text" },
  { key: "price", label: "Price / night", type: "number" },
  { key: "capacity", label: "Capacity", type: "number" },
  { key: "size", label: "Size", type: "text" },
  { key: "description", label: "Description", type: "textarea" },
];

const emptyItem = { name: "", price: 0, capacity: 2, size: "", description: "" };

export default function AdminRooms() {
  return (
    <AdminLayout>
      <AdminCrudTable title="Rooms" api={roomsApi} fields={fields} emptyItem={emptyItem} />
    </AdminLayout>
  );
}

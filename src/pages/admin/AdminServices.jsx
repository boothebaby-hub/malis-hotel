import AdminLayout from "../../components/AdminLayout";
import AdminCrudTable from "../../components/AdminCrudTable";
import { servicesApi } from "../../services/firestore";

const fields = [
  { key: "name", label: "Name", type: "text" },
  { key: "description", label: "Description", type: "textarea" },
];

const emptyItem = { name: "", description: "" };

export default function AdminServices() {
  return (
    <AdminLayout>
      <AdminCrudTable title="Services" api={servicesApi} fields={fields} emptyItem={emptyItem} />
    </AdminLayout>
  );
}

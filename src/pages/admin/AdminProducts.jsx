import AdminLayout from "../../components/AdminLayout";
import AdminCrudTable from "../../components/AdminCrudTable";
import { productsApi } from "../../services/firestore";

const fields = [
  { key: "name", label: "Name", type: "text" },
  { key: "price", label: "Price", type: "number" },
  { key: "description", label: "Description", type: "textarea" },
];

const emptyItem = { name: "", price: 0, description: "" };

export default function AdminProducts() {
  return (
    <AdminLayout>
      <AdminCrudTable title="Products" api={productsApi} fields={fields} emptyItem={emptyItem} />
    </AdminLayout>
  );
}

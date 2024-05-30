import AdminPage from "app/_components/admin/admin";

export default function AdminWrapper() {
   
    var apiBaseUrl = process.env.BASE_API_URL ?? "http://localhost:5000";

    return (
       <AdminPage apiBaseUrl={apiBaseUrl} />
    );
}

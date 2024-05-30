import AdminPage from "app/_components/admin/admin";

export default function AdminWrapper() {
   
    var apiBaseUrl = process.env.BROWSER_BASE_API_URL ?? "";

    return (
       <AdminPage apiBaseUrl={apiBaseUrl} />
    );
}

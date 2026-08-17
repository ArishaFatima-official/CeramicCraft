import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

const AdminLayout = () => {
  return (
    <div className="d-flex min-vh-100">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-grow-1 bg-light">

        {/* Top Navbar */}
        <AdminNavbar />

        {/* Page Content */}
        <main>
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;
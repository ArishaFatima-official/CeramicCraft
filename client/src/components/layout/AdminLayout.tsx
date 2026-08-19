import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import "../../style/Admin.css";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="admin-layout d-flex min-vh-100">

      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="admin-sidebar-overlay d-lg-none"
          onClick={closeSidebar}
        ></div>
      )}

      <div className="admin-main flex-grow-1 bg-light">

        <AdminNavbar
          onMenuClick={openSidebar}
        />

        <main>
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getPageTitle = () => {
    if (location.pathname === "/admin") {
      return "Dashboard";
    }

    if (location.pathname.startsWith("/admin/orders")) {
      return "Orders";
    }

    if (location.pathname.startsWith("/admin/products/add")) {
      return "Add Product";
    }

    if (location.pathname.startsWith("/admin/products/edit")) {
      return "Edit Product";
    }

    if (location.pathname.startsWith("/admin/products")) {
      return "Products";
    }

    if (location.pathname.startsWith("/admin/categories")) {
      return "Categories";
    }

    return "Admin Panel";
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar bg-white shadow-sm border-bottom px-4 py-3">
      <div className="container-fluid">

        <div>
          <h5 className="fw-bold mb-0">
            {getPageTitle()}
          </h5>

          <small className="text-muted">
            Welcome, {user?.name}
          </small>
        </div>

        <button
          className="btn btn-outline-danger btn-sm"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>
    </nav>
  );
};

export default AdminNavbar;
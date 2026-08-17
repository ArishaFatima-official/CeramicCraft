import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside
      className="bg-dark text-white shadow-sm min-vh-100"
      style={{ width: "250px" }}
    >
      <div className="p-4">

        {/* Brand */}
        <div className="mb-4">
          <h4 className="fw-bold mb-1">
            CeramicCraft
          </h4>

          <small className="text-secondary">
            Admin Panel
          </small>
        </div>

        {/* Navigation */}
        <ul className="nav nav-pills flex-column gap-2">

          <li className="nav-item">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `nav-link ${
                  isActive
                    ? "active"
                    : "text-white"
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/admin/orders"
              className={({ isActive }) =>
                `nav-link ${
                  isActive
                    ? "active"
                    : "text-white"
                }`
              }
            >
              Orders
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/admin/products"
              className={({ isActive }) =>
                `nav-link ${
                  isActive
                    ? "active"
                    : "text-white"
                }`
              }
            >
              Products
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/admin/products/add"
              className={({ isActive }) =>
                `nav-link ${
                  isActive
                    ? "active"
                    : "text-white"
                }`
              }
            >
              Add Product
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/admin/categories"
              className={({ isActive }) =>
                `nav-link ${
                  isActive
                    ? "active"
                    : "text-white"
                }`
              }
            >
              Categories
            </NavLink>
          </li>

        </ul>

      </div>
    </aside>
  );
};

export default AdminSidebar;
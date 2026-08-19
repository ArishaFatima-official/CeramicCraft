import { NavLink } from "react-router-dom";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSidebar = ({
  isOpen,
  onClose,
}: AdminSidebarProps) => {
  return (
    <aside
      className={`admin-sidebar bg-dark text-white shadow-sm ${
        isOpen ? "show" : ""
      }`}
    >

      <div className="p-4">

        {/* Header */}
        <div className="sidebar-header mb-4">

          <div>
            <h4 className="fw-bold mb-1">
              CeramicCraft
            </h4>

            <small className="text-secondary">
              Admin Panel
            </small>
          </div>

          {/* Close button - mobile only */}
          <button
            type="button"
            className="btn btn-close btn-close-white d-lg-none"
            onClick={onClose}
            aria-label="Close sidebar"
          ></button>

        </div>

        {/* Navigation */}
        <ul className="nav nav-pills flex-column gap-2">

          <li className="nav-item">
            <NavLink
              to="/admin"
              end
              onClick={onClose}
              className={({ isActive }) =>
                `nav-link ${
                  isActive ? "active" : "text-white"
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/admin/orders"
              onClick={onClose}
              className={({ isActive }) =>
                `nav-link ${
                  isActive ? "active" : "text-white"
                }`
              }
            >
              Orders
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/admin/products"
              onClick={onClose}
              className={({ isActive }) =>
                `nav-link ${
                  isActive ? "active" : "text-white"
                }`
              }
            >
              Products
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/admin/products/add"
              onClick={onClose}
              className={({ isActive }) =>
                `nav-link ${
                  isActive ? "active" : "text-white"
                }`
              }
            >
              Add Product
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/admin/categories"
              onClick={onClose}
              className={({ isActive }) =>
                `nav-link ${
                  isActive ? "active" : "text-white"
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
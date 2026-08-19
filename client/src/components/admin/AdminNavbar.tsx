import { useAuth } from "../../context/AuthContext";

interface AdminNavbarProps {
  onMenuClick: () => void;
}

const AdminNavbar = ({
  onMenuClick,
}: AdminNavbarProps) => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-dark bg-dark shadow-sm admin-navbar">

      <div className="container-fluid">

        <div className="d-flex align-items-center">

          {/* Mobile menu button */}
          <button
            className="btn btn-dark d-lg-none me-2"
            type="button"
            onClick={onMenuClick}
            aria-label="Open sidebar"
          >
            ☰
          </button>

          <span className="navbar-brand fw-bold mb-0">
            CeramicCraft Admin
          </span>

        </div>

        <div className="d-flex align-items-center gap-3">

          <span className="text-white d-none d-sm-block">
            Welcome, {user?.name}
          </span>

          <button
            className="btn btn-outline-light btn-sm"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
};

export default AdminNavbar;
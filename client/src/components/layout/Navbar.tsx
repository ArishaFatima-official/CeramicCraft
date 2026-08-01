import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          CeramicCraft
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart
              </Link>
            </li>
          </ul>
          {isAuthenticated && (
      <li className="nav-item"><Link className="nav-link" to="/orders">Order History</Link></li>
    )}

          <ul className="navbar-nav">
            {isAuthenticated ? (
              <>
               <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
                <li className="nav-item">
                  <span className="nav-link">
                    Welcome, {user?.name}
                  </span>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
               <li className="nav-item">
              <Link className="nav-link btn btn-outline-light ms-lg-2 px-3" to="/register">
                Register
              </Link>
            </li>
            </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "./Loader";

type Props = {
  adminOnly?: boolean;
};

const ProtectedRoute = ({ adminOnly = false }: Props) => {
  const {
    isAuthenticated,
    user,
    loading,
  } = useAuth();

  // Wait for localStorage authentication check
  if (loading) {
    return <Loader />;
  }

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Admin route
  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
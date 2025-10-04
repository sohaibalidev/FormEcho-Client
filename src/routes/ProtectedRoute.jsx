import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/Auth" />;
  if (requireAdmin && user.role !== "admin")
    return <Navigate to="/dashboard" />;

  return children;
};

export default ProtectedRoute;

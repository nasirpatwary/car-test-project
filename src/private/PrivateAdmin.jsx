import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import { useAdmin } from "../hooks/useCollection";
import LoadingSpinner from "../components/LoadingSpinner";

const PrivateAdmin = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  const [isAdmin, isLoading] = useAdmin();
  if (loading || isLoading) return <LoadingSpinner />;
  if (user && isAdmin) return children;
  return <Navigate state={location.pathname} to="/login" />;
};

export default PrivateAdmin;

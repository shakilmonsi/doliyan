import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../features/auth/authUtils";

const RequireAdmin = ({ children }) => {
  const user = getCurrentUser();

  if (!user || user?.role !== "ADMIN") {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default RequireAdmin;

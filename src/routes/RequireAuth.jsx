// src/routes/RequireAuth.jsx
import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "../features/auth/authUtils";

const RequireAuth = ({ children }) => {
  // You can replace this with a Redux selector if you prefer
  const userInfo = getCurrentUser();

  const location = useLocation();

  // If no user is logged in, redirect to login
  if (!userInfo) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // If logged in, render the protected component
  return children;
};

export default RequireAuth;

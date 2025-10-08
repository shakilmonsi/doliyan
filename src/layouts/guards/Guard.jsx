// src/routes/Guards.jsx
import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "../../features/auth/authUtils";

/**
 * Guard component for route protection and redirects
 * @param {ReactNode} children - The content to render
 * @param {boolean} adminOnly - Only ADMIN can access
 * @param {boolean} blockAdmin - Block logged-in users from this route (e.g., login/register)
 */
export const Guard = ({ children, adminOnly, blockAdmin, blockUser }) => {
  const user = getCurrentUser();
  const location = useLocation();

  if (blockUser && user?.role === "USER") {
    return <Navigate to="/" replace />;
  }
  // -------------------------
  // 1. Block admin / logged-in users from accessing public/auth pages
  // -------------------------
  if (blockAdmin && user?.role === "ADMIN") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (blockAdmin && user && user?.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  // -------------------------
  // 2. Admin-only route
  // -------------------------
  if (adminOnly && (!user || user?.role !== "ADMIN")) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // -------------------------
  // 3. Protected route for any logged-in user
  // -------------------------
  if (!adminOnly && !blockAdmin && !user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // -------------------------
  // Render the children if everything passes
  // -------------------------
  return children;
};

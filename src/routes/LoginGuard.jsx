import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../features/auth/authUtils";

const LoginGuard = ({ children }) => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    if (user?.ispaid) {
      navigate("/", { replace: true });
    } else if (user) {
      navigate("/auth/payment", { replace: true });
    }
  }, [navigate, user]);

  return !user ? children : null; // render login page only for guests
};

export default LoginGuard;

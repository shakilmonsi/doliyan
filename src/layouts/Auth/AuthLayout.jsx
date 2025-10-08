import { Outlet, Navigate } from "react-router-dom";
import MainHeader from "../Main/MainHeader";
import MainFooter from "../Main/MainFooter";
import { getCurrentUser } from "../../features/auth/authUtils";
import { ScrollToTop } from "../../components/ScrollToTop/ScrollToTop";

const AuthLayout = () => {
  const user = getCurrentUser();

  if (user?.role === "ADMIN") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainHeader />
      <ScrollToTop />
      <main className="flex-grow">
        <Outlet />
      </main>
      <MainFooter />
    </div>
  );
};

export default AuthLayout;

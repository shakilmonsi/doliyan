import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import { ScrollToTop } from "../../components/ScrollToTop/ScrollToTop";
import { getCurrentUser } from "../../features/auth/authUtils";

const MainLayout = () => {
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

export default MainLayout;

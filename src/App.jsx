import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";

import AppRoutes from "./routes/routes";
import { ThemeProvider } from "./context/ThemeContext/ThemeProvider";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <ToastContainer closeOnClick={true} />
          <RouterProvider router={AppRoutes} />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;

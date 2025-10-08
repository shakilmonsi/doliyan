import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { ScaleLoader } from "react-spinners";

import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./features/store.js";
import ErrorBoundary from "./pages/err/ErrorBoundary.jsx";

import "./i18n.js";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="flex h-screen items-center justify-center">
              <ScaleLoader color="#36d7b7" />
            </div>
          }
        >
          <App />
        </Suspense>
      </ErrorBoundary>
    </Provider>
  </StrictMode>,
);

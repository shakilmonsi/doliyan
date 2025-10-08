import { useRouteError, Link, useNavigate } from "react-router-dom";
import { FiAlertTriangle, FiHome, FiRefreshCw } from "react-icons/fi";

const ErrorPage = () => {
  const error = useRouteError() || {};
  const navigate = useNavigate();

  // Default error message
  let errorMessage = "An unknown error occurred";
  let errorTitle = "Oops! Something went wrong";
  let errorCode = null;

  // Safely check error status
  if (error?.status) {
    errorCode = error.status;

    switch (error.status) {
      case 404:
        errorTitle = "Page Not Found";
        errorMessage =
          "The page you're looking for doesn't exist or has been moved.";
        break;
      case 500:
        errorTitle = "Server Error";
        errorMessage =
          "Our servers are having some trouble. Please try again later.";
        break;
      case 403:
        errorTitle = "Access Denied";
        errorMessage = "You don't have permission to access this page.";
        break;
      default:
        // Use the error's message if available
        if (error?.data?.message || error?.message) {
          errorMessage = error.data?.message || error.message;
        }
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-red-50 p-4 text-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
        {/* Error Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-400">
          <FiAlertTriangle className="h-8 w-8" />
        </div>

        {/* Error Code */}
        {errorCode && (
          <span className="mb-2 inline-block rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
            Error {errorCode}
          </span>
        )}

        {/* Error Title */}
        <h1 className="mb-3 text-2xl font-bold text-gray-900">{errorTitle}</h1>

        {/* Error Message */}
        <p className="mb-6 text-gray-600">{errorMessage}</p>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            <FiRefreshCw className="mr-2 h-4 w-4" />
            Go Back
          </button>
          <Link
            to="/"
            className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            <FiHome className="mr-2 h-4 w-4" />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

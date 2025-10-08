// CancelPage.jsx
import { Link } from "react-router-dom"; // or use <a> if not using React Router

const CancelPage = () => {
  return (
    <section>
      <div className="bg-[#a3504b] p-8 md:p-9" />
      <div className="flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-pink-100 p-4 py-10 md:min-h-screen md:py-0">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl md:p-12">
          {/* Icon */}
          <div className="mb-6">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-8 w-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-2 text-2xl font-bold text-gray-800">
            Payment Canceled
          </h1>

          {/* Message */}
          <p className="mb-6 text-gray-600">
            You have canceled the payment process. No charges were made.
          </p>

          {/* Action Button */}
          <div className="mb-6">
            <Link
              to="/auth/checkout" // ← Change this to your checkout/cart route
              className="focus:ring-opacity-50 inline-block w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              Return to Checkout
            </Link>
          </div>

          {/* Secondary Option */}
          <div className="text-sm text-gray-500">
            Need help?{" "}
            <a
              href="/contact"
              className="font-medium text-blue-600 hover:underline"
            >
              Contact Support
            </a>
          </div>

          {/* Decorative Dots */}
          <div className="mt-8 flex items-center justify-center space-x-2 text-gray-300">
            <div className="h-2 w-2 rounded-full bg-current"></div>
            <div className="h-2 w-2 rounded-full bg-current"></div>
            <div className="h-2 w-2 rounded-full bg-current"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CancelPage;

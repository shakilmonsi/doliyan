import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessComponent = ({ sessionData }) => {
  const navigate = useNavigate();

  const handleProperties = () => {
    navigate("/properties"); // redirect user to their properties
  };

  return (
    <section>
      <div className="bg-[#006e00] p-8 md:p-9" />
      <div className="flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4 py-10 md:min-h-screen md:py-0">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl md:p-12">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="mb-2 text-2xl font-bold text-gray-800">
            Payment Successful! 🎉
          </h1>

          <p className="mb-4 text-gray-600">
            Thank you for subscribing. Your payment has been processed
            successfully.
          </p>

          {sessionData && (
            <div className="mb-6 rounded-lg bg-green-50 p-4 text-left">
              <p className="text-gray-700">
                <strong>Subscription:</strong>{" "}
                {sessionData.display_items?.[0]?.plan?.nickname || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong>Amount:</strong>{" "}
                {sessionData.amount_total
                  ? (sessionData.amount_total / 100).toFixed(2) +
                    " " +
                    sessionData.currency.toUpperCase()
                  : "N/A"}
              </p>
              <p className="text-gray-700">
                <strong>Status:</strong> {sessionData.payment_status}
              </p>
            </div>
          )}

          <button
            onClick={handleProperties}
            className="w-full rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
          >
            Go to Properties
          </button>
        </div>
      </div>
    </section>
  );
};

export default SuccessComponent;

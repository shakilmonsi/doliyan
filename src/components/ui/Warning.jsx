import React from "react";
import { Link } from "react-router-dom";

const Warning = () => {
  return (
    <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6 shadow-sm lg:col-span-3">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-yellow-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4.732c-.77-1.333-2.694-1.333-3.464 0L3.34 16.732c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            Je proefperiode is verlopen
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              Upgrade naar Premium om alle foto’s te zien en op berichten te
              reageren.
            </p>
          </div>
          <div className="mt-4">
            <Link
              to="/properties"
              className="rounded-md bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-800 hover:bg-yellow-200 focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:outline-none"
            >
              Upgrade nu Prime
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Warning;

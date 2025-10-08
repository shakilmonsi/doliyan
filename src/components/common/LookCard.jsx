import React from "react";

const LookCard = () => {
  return (
    <div className="relative mx-auto mt-10 w-full max-w-md overflow-hidden rounded-xl">
      {/* Background Image */}
      <img
        src="/home/nl-property-hero.jpg"
        alt="House"
        className="h-full w-full object-cover"
      />

      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>

      {/* Content with Eye Icon */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4">
        {/* Eye Icon Container */}
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-black/30 backdrop-blur-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </div>

        {/* Text Content */}
        <h2 className="text-accent mb-2 text-2xl font-bold">
          Premium Property
        </h2>
        <p className="text-center text-sm text-gray-200">
          Only available for premium users
        </p>
      </div>
    </div>
  );
};

export default LookCard;

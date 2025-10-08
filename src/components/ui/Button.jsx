// components/ui/Button.jsx
import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  onClick,
  disabled = false,
  isLoading = false, // <-- accept isLoading
  className = "",
}) => {
  const baseStyles =
    "rounded font-semibold transition duration-200 focus:outline-none text-white flex items-center justify-center";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-[#0C205A] hover:bg-gray-300 text-black",
    outline: "border border-gray-400 text-gray-800 hover:bg-gray-100",
    yellowGradient:
      "bg-gradient-to-r from-[#3CAAFA] to-[#1198fa] hover:from-[#1a8adb] hover:to-[#0278d9] shadow transition-transform hover:scale-95 ",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-sm md:text-base lg:text-lg",
  };

  const combinedClasses = [
    baseStyles,
    variantStyles[variant] || variantStyles.primary,
    sizeStyles[size] || sizeStyles.md,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled || isLoading} // <-- disable while loading
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
            ></path>
          </svg>
          Processing...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;

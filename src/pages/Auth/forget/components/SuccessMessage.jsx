import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../../hook/useLanguage";

const SuccessMessage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div
      className="animate-fade-in mx-auto max-w-md rounded-2xl p-6 text-center"
      role="alert"
    >
      {/* Success Icon */}
      <div className="mb-5 flex justify-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h2 className="mb-4 text-2xl leading-tight font-bold text-[#19398A]">
        {t("auth.forgetPassword.successTitle")}
      </h2>

      {/* Success Box */}
      <div className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4">
        <p className="text-sm leading-relaxed text-green-800 md:text-base">
          {t("auth.forgetPassword.successMessage")}
        </p>
      </div>

      {/* Instruction */}
      <p className="mb-6 text-sm leading-relaxed text-gray-600 md:text-base">
        {t("auth.forgetPassword.checkEmail")}
      </p>

      {/* Optional: Back link */}
      <p className="mt-4 text-sm text-gray-500">
        {t("auth.forgetPassword.backToLogin")}
        <button
          type="button"
          onClick={() => navigate("/auth/login")}
          className="ml-1 font-medium text-[#19398A] hover:underline focus:outline-none"
        >
          {t("auth.login.title")}
        </button>
      </p>
    </div>
  );
};

// Optional: Add simple fade-in animation
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);

export default SuccessMessage;

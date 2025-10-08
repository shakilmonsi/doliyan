import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useLanguage } from "../../../hook/useLanguage";
import Button from "../../../components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { FORGOT_PASSWORD_THUNK } from "../../../features/auth/authThunk";
import SuccessMessage from "./components/SuccessMessage";

const ForgetPassPage = () => {
  const { t } = useLanguage();
  const dispatch = useDispatch();

  // Get loading and forgotPasswordSuccess state from Redux store
  const { loading, forgotPasswordSuccess } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = t("auth.validation.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t("auth.validation.emailInvalid");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // In your component's handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await dispatch(FORGOT_PASSWORD_THUNK(email)).unwrap();
      // Only reaches here if status !== "fail"
      toast.success(t("auth.forgetPassword.successMessage"));
      // Show success UI state
    } catch (error) {
      if (error.includes("not found")) {
        toast.error(t("auth.forgetPassword.emailNotFound"));
      } else {
        toast.error(error || t("auth.forgetPassword.errorMessage"));
      }
    }
  };

  return (
    <section>
      <div className="border bg-[#082e63] pt-18" />
      <div
        className="flex items-center justify-center md:px-0 md:py-0 lg:py-34"
        style={{ fontFamily: "var(--font-secondary)" }}
      >
        <div className="container flex max-w-7xl flex-col overflow-hidden border-1 border-gray-100 bg-white shadow md:flex-row md:rounded">
          {/* Left: Image */}
          <div className="hidden p-8 md:block md:w-1/2">
            <img
              src="/image/random/forget.png"
              alt="Forgot Password Visual"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Right: Content */}
          <div className="flex w-full flex-col justify-center p-8 md:w-1/2">
            {forgotPasswordSuccess ? (
              <SuccessMessage />
            ) : (
              <>
                <h2 className="mb-6 text-2xl font-extrabold text-[#19398A] md:mb-2 md:text-center">
                  {t("auth.forgetPassword.title")}
                </h2>

                <p className="mb-6 text-gray-600 md:text-center">
                  {t("auth.forgetPassword.description")}
                </p>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      {t("auth.forgetPassword.email")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={`w-full rounded-md border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
                      placeholder={t("auth.forgetPassword.emailPlaceholder")}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    variant="yellowGradient"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      t("auth.forgetPassword.resetButton")
                    )}
                  </Button>
                </form>

                <p className="mt-6 text-center text-gray-600">
                  {t("auth.forgetPassword.rememberPassword")}{" "}
                  <Link
                    to="/auth/login"
                    className="font-semibold text-blue-500 hover:underline"
                  >
                    {t("auth.login.title")}
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassPage;

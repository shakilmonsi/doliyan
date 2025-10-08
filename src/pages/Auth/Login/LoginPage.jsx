import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { loginUser } from "../../../features/auth/authSlice"; // Import loginUser action
import { LOGING_USER_THUNK } from "../../../features/auth/authThunk";

import Button from "../../../components/ui/Button";
import { useFavorites } from "../../../context/FavouriteContext/FavouriteProvider";
import { useLanguage } from "../../../hook/useLanguage";
import { getCurrentUser } from "../../../features/auth/authUtils";

function LoginPage() {
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { setUser } = useFavorites();

  // Get loading and error states from Redux store
  const { loading } = useSelector((state) => state.auth);

  // Local state for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    try {
      // Dispatch loginUser action
      await dispatch(LOGING_USER_THUNK({ email, password })).unwrap();

      // After successful login, get the user info from localStorage
      const userInfo = getCurrentUser();

      setUser(userInfo?.data || null);

      toast.success(t("auth.toastMessage.successMessage"));
      navigate("/properties");
    } catch (error) {
      toast.error(error || t("auth.toastMessage.errorMessage"));
    }
  };

  return (
    <section>
      <div className="border bg-[#082e63] pt-18" />
      <div
        className="flex items-center justify-center md:px-0 md:py-0 lg:py-26"
        style={{ fontFamily: "var(--font-secondary)" }}
      >
        <div className="container flex max-w-7xl flex-col overflow-hidden border-1 border-gray-100 bg-white shadow md:flex-row md:rounded">
          {/* Left: Image */}
          <div className="hidden p-8 md:block md:w-1/2">
            <img
              src="/image/random/login-image.png"
              alt="Login Visual"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Right: Form */}
          <div className="flex w-full flex-col justify-center p-8 md:w-1/2">
            <h2 className="mb-6 text-2xl font-extrabold text-[#19398A] md:mb-10 md:text-center">
              {t("auth.login.title")}
            </h2>

            <form onSubmit={onSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  {t("auth.common.email")}
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-300 px-5 py-3 text-gray-800 placeholder-gray-400 transition focus:ring-2 focus:ring-[#19398A] focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state on change
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  {t("auth.common.pass")}
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="********"
                  className="w-full rounded-xl border border-gray-300 px-5 py-3 text-gray-800 placeholder-gray-400 transition focus:ring-2 focus:ring-[#19398A] focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state on change
                />
              </div>

              <p className="text-right">
                <Link
                  to="/auth/forgot-password"
                  className="font-semibold text-blue-500 hover:underline"
                >
                  {t("auth.login.forget")}?{" "}
                </Link>
              </p>

              {/* Error Message */}
              {error && <p className="text-sm text-red-500">{error}</p>}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                size="lg"
                variant="yellowGradient"
                className="w-full"
              >
                {loading ? (
                  <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-400" />
                ) : (
                  <>{t("header.login")}</>
                )}
              </Button>
            </form>

            {/* Register Link */}
            <p className="mt-6 text-center text-gray-600">
              {t("auth.login.footer")}{" "}
              <Link
                to="/auth/register"
                className="font-semibold text-blue-500 hover:underline"
              >
                {t("header.register")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;

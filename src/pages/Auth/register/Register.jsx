import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { REGISTER_USER_THUNK } from "../../../features/auth/authThunk";
import { useLanguage } from "../../../hook/useLanguage";
import { useFavorites } from "../../../context/FavouriteContext/FavouriteProvider";
import Button from "../../../components/ui/Button";

const RegisterPage = () => {
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setUser } = useFavorites();

  // Get auth state from Redux store
  const [localError, setLocalError] = useState("");
  const { loading, error: authError } = useSelector((state) => state.auth);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    // Basic validation
    if (!formData.name.trim()) {
      setLocalError(t("auth.validation.nameRequired"));
      return;
    }

    if (!formData.email.trim()) {
      setLocalError(t("auth.validation.emailRequired"));
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setLocalError(t("auth.validation.emailInvalid"));
      return;
    }

    if (!formData.password.trim()) {
      setLocalError(t("auth.validation.passwordRequired"));
      return;
    }

    if (formData.password.length < 6) {
      setLocalError(t("auth.validation.passwordLength"));
      return;
    }

    try {
      // Dispatch register action
      const result = await dispatch(REGISTER_USER_THUNK(formData)).unwrap();

      // If registration is successful
      if (result?.token) {
        setUser(result);
        toast.success(t("auth.toastMessage.successMessage"));
        navigate("/properties");
      }
    } catch (error) {
      console.log("Resgister: ", error);
    }
  };

  return (
    <section>
      <div className="border bg-[#082e63] pt-18" />
      <div
        className="flex items-center justify-center lg:py-26"
        style={{ fontFamily: "var(--font-secondary)" }}
      >
        <div className="container flex max-w-7xl flex-col overflow-hidden rounded-xl border-1 border-gray-100 bg-white shadow-sm md:flex-row">
          {/* Left Image Section */}
          <div className="hidden items-center justify-center p-8 md:flex md:w-1/2">
            <img
              src="/image/random/register-image.png"
              alt="Register Visual"
              className="h-auto max-w-full object-contain"
            />
          </div>

          {/* Right Form Section */}
          <div className="flex w-full flex-col justify-center p-10 md:w-1/2">
            <h2 className="mb-6 text-2xl font-extrabold text-[#19398A] md:mb-10 md:text-center">
              {t("auth.register.title")}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label
                  className="mb-2 block text-sm font-semibold text-gray-700"
                  htmlFor="name"
                >
                  {t("auth.register.name")}
                </label>
                <input
                  className="w-full rounded-xl border border-gray-300 px-5 py-3 text-gray-800 placeholder-gray-400 transition focus:ring-2 focus:ring-[#19398A] focus:outline-none"
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="email"
                >
                  {t("auth.common.email")}
                </label>
                <input
                  className="w-full rounded-xl border border-gray-300 px-5 py-3 text-gray-800 placeholder-gray-400 transition focus:ring-2 focus:ring-[#19398A] focus:outline-none"
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="password"
                >
                  {t("auth.common.pass")}
                </label>
                <input
                  className="w-full rounded-xl border border-gray-300 px-5 py-3 text-gray-800 placeholder-gray-400 transition focus:ring-2 focus:ring-[#19398A] focus:outline-none"
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                />
              </div>

              {/* Error Message */}
              {(localError || authError) && (
                <div className="rounded-md bg-red-100 p-3 text-red-700">
                  {localError || authError}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                size="lg"
                variant="yellowGradient"
                className="w-full"
              >
                {loading ? (
                  <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  t("auth.register.button")
                )}
              </Button>

              <p className="mt-6 text-center text-gray-600">
                {t("auth.register.footer")}{" "}
                <Link
                  to="/auth/login"
                  className="font-semibold text-blue-500 hover:underline"
                >
                  {t("header.login")}
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;

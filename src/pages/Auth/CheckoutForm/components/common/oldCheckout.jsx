// === Frontend: src/pages/CheckoutForm.jsx (Card Only) ===
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import Button from "../../../components/ui/Button";
import axios from "../../../utils/axiosInstance";
import { useLanguage } from "../../../hook/useLanguage";
import { isPaid } from "../../../features/auth/authUtils";
import CheckCard from "./components/CheckCard";

const CheckoutForm = () => {
  const { t } = useLanguage();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const handleChoosePlan = () => {
    navigate(-1);
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const selectedPlan = useSelector((state) => state.subscription.selectedPlan);

  const isPaidUsers = isPaid();
  let User = null;

  if (isPaidUsers && typeof window !== "undefined") {
    const userInfo = localStorage.getItem("userInfo");
    const parsedUser = JSON.parse(userInfo);
    User = parsedUser?.data;
  }

  const getErrorMessage = (err) =>
    err.response?.data?.message ||
    err.raw?.message ||
    err.message ||
    "Payment failed. Please try again.";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!User || !stripe || !elements) {
      setError("Authentication or payment system not ready.");
      setLoading(false);
      return;
    }

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setError("Card details not ready.");
        setLoading(false);
        return;
      }

      // 1️⃣ Create payment method
      const { error: pmError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: { email: User.email },
        });
      if (pmError) throw pmError;

      // 2️⃣ Call backend to create subscription
      const { data } = await axios.post("/stripe/create-subscription-card", {
        paymentMethodId: paymentMethod.id,
        plan: selectedPlan.name,
        email: User.email,
        userId: User.id,
      });

      // 3️⃣ Handle 3D Secure if required
      if (!data.success) {
        if (data.requiresAction && data.clientSecret) {
          const { error: confirmCardError } = await stripe.confirmCardPayment(
            data.clientSecret,
          );
          if (confirmCardError) throw confirmCardError;
        } else {
          throw new Error(data.message || "Subscription process failed.");
        }
      }

      // 4️⃣ Refresh user + redirect
      const { data: freshUser } = await axios.patch(`/users/${User.id}`, {
        ispaid: true,
      });

      localStorage.setItem("userInfo", JSON.stringify(freshUser));

      navigate("/auth/payment-success", {
        state: {
          plan: selectedPlan,
          planPrice: selectedPlan.price,
          subscriptionId: data.subscriptionId,
          customerId: data.customerId,
          userData: freshUser,
          paymentId: data.paymentIntentId || paymentMethod?.id,
          clientSecret: data.clientSecret || null,
          email: User.email,
        },
        replace: true,
      });
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      console.error("Checkout process error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div
        className={`${
          selectedPlan.recommended
            ? "bg-green-900 p-9 shadow"
            : "bg-blue-900 p-9 shadow"
        }`}
      />

      <div className="flex items-center justify-center bg-gray-100 p-4 py-20">
        <div className="w-full max-w-4xl items-center justify-center gap-8 rounded-lg bg-white p-8 shadow-xl md:flex">
          {/* Left Side: Selected Plan Card */}
          <div className="w-full lg:w-1/2">
            {selectedPlan ? (
              <CheckCard
                handleChoosePlan={handleChoosePlan}
                selectedPlan={selectedPlan}
              />
            ) : (
              <div className="text-center text-gray-500">
                {t("No plan selected")}
              </div>
            )}
          </div>

          {/* Right Side: Payment Form */}
          <div className="w-full lg:w-1/2">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
              {t("auth.payment")}
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Card Payment Section */}
              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">
                  {t("auth.register.card")}
                </label>
                <div className="mb-6 rounded-md border border-gray-300 bg-gray-50 p-4">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#424770",
                          "::placeholder": { color: "#aab7c4" },
                        },
                        invalid: {
                          color: "#9e2146",
                        },
                      },
                      hidePostalCode: true,
                    }}
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div
                  className="relative mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
                  role="alert"
                >
                  <strong className="font-bold">{t("Error!")}</strong>
                  <span className="ml-2 block sm:inline">{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                isLoading={loading}
                disabled={loading || !stripe || !elements || !selectedPlan}
                variant="yellowGradient"
                className="w-full"
                size="lg"
              >
                {t("common.applyNow")} - {selectedPlan?.price}
              </Button>

              {/* Cancel Link */}
              <div className="mt-6 text-center">
                <Link
                  to="/properties"
                  className="text-sm text-blue-500 hover:underline"
                >
                  {t("common.cancel")}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutForm;

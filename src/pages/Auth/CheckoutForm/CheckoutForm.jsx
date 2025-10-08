// === Frontend: src/pages/CheckoutForm.jsx (Card + iDEAL) ===
import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/ui/Button";
import { useLanguage } from "../../../hook/useLanguage";
import { getCurrentUser } from "../../../features/auth/authUtils";
import CheckCard from "./components/CheckCard";
import {
  createSubscriptionCard,
  createSubscriptionIdeal,
} from "../../../features/subscriptions/subscriptionAPI";
import { STORAGE } from "../../../utils/storage";
import { UPDATE_USER_PAYMENT_STATUS_THUNK } from "../../../features/subscriptions/subscriptionThunk";
import SubscriptionCard from "../../public/properties/components/single-property/SubscriptionCard";
import plans from "../../../assets/data/plans.json";

// Constants
const IDEAL_BANKS = [
  { id: "abn_amro", name: "ABN AMRO" },
  { id: "asn_bank", name: "ASN Bank" },
  { id: "bunq", name: "bunq" },
  { id: "ing", name: "ING" },
  { id: "knab", name: "Knab" },
  { id: "rabobank", name: "Rabobank" },
  { id: "regiobank", name: "RegioBank" },
  { id: "sns_bank", name: "SNS Bank" },
  { id: "triodos_bank", name: "Triodos Bank" },
  { id: "van_lanschot", name: "Van Lanschot" },
];

const CARD_ELEMENT_OPTIONS = {
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
};

const CheckoutForm = () => {
  const { t } = useLanguage();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("ideal"); // default to iDEAL
  const [selectedBank, setSelectedBank] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const selectedPlan = useSelector((state) => state.subscription.selectedPlan);

  const isPaidUsers = getCurrentUser();

  // Memoize user data to prevent unnecessary recalculations
  const user = useMemo(() => {
    return isPaidUsers ? isPaidUsers : null;
  }, [isPaidUsers]);

  const handleChoosePlan = () => {
    navigate(-1);
  };

  const getErrorMessage = (err) => {
    return (
      err.response?.data?.message ||
      err.raw?.message ||
      err.message ||
      t("auth.checkout.paymentFailed")
    );
  };

  // ====================================================
  // FORM VALIDATION
  // ====================================================
  const validateForm = () => {
    if (!user) return t("auth.checkout.userNotAuthenticated");
    if (!email) return t("auth.checkout.emailRequired");
    if (!selectedPlan?.id) return t("auth.checkout.noPlanSelected");
    if (paymentMethod === "ideal" && !selectedBank)
      return t("auth.checkout.bankSelectionRequired");

    return null; // ✅ no errors
  };

  // ====================================================
  // UPDATE USER PAYMENT STATUS LOCAL STORAGE
  // ====================================================
  const updateUserLocalStorage = async (userId) => {
    const existingUserInfo = STORAGE.getUser() || {};

    const updatedUserInfo = {
      ...existingUserInfo,
      ispaid: true,
    };

    STORAGE.setUser(updatedUserInfo);
  };

  // ====================================================
  // UPDATE USER PAYMENT STATUS DATABASE
  // ====================================================
  const updateUserDatabase = async (userId) => {
    await dispatch(UPDATE_USER_PAYMENT_STATUS_THUNK({ userId }));
  };

  // ====================================================
  // HANDLE CARD PAYMENT
  // ====================================================
  const handleCardPayment = async () => {
    if (!stripe || !elements) {
      throw new Error("Stripe has not been initialized");
    }

    const { error: pmError, paymentMethod: pm } =
      await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: { email },
      });

    if (pmError) throw new Error(pmError.message);

    const subscriptionPayload = {
      email,
      planId: selectedPlan.id,
      paymentMethodId: pm.id,
    };

    return await createSubscriptionCard(subscriptionPayload);
  };

  // ====================================================
  // HANDLE iDEAL PAYMENT
  // ====================================================
  const handleIdealPayment = async () => {
    const subscriptionPayload = {
      email,
      planId: selectedPlan.id,
      bank: selectedBank,
    };

    return await createSubscriptionIdeal(subscriptionPayload);
  };

  // ====================================================
  // HANDLE FORM SUBMISSION
  // ====================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const errorMessage = validateForm();
      if (errorMessage) throw new Error(errorMessage);

      let subscriptionData;

      if (paymentMethod === "card") {
        subscriptionData = await handleCardPayment();
      } else {
        subscriptionData = await handleIdealPayment();

        // Redirect to bank for iDEAL authentication
        if (subscriptionData.data?.redirectUrl) {
          window.location.href = subscriptionData.data.redirectUrl;
          return;
        }
      }

      console.log("Subscription Response:", subscriptionData);

      if (!subscriptionData?.success) {
        throw new Error(
          subscriptionData?.error || t("auth.checkout.subscriptionFailed"),
        );
      }

      // 2️⃣ Update user ispaid = true on backend
      const userId = user.id;
      const userUpdateResponse = await updateUserLocalStorage(userId);
      await updateUserDatabase(userId);

      // Redirect to success page
      navigate("/auth/payment-success", {
        state: {
          plan: selectedPlan,
          planPrice: selectedPlan.price,
          subscriptionId: subscriptionData.data.subscriptionId,
          customerId: subscriptionData.data.customerId,
          userData: userUpdateResponse,
          paymentId: subscriptionData.data.paymentIntentId || null,
          clientSecret: subscriptionData.data.clientSecret || null,
          email: user.email,
        },
        replace: true,
      });
    } catch (err) {
      console.error("Checkout error:", err);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // Early return if no plan is selected
  if (!selectedPlan) {
    return (
      <div>
        <div
          className={`${selectedPlan?.recommended ? "bg-green-900" : "bg-blue-900"} p-9 shadow`}
        />
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-800">
            {t("auth.checkout.noPlanSelected")}
          </h2>
          <SubscriptionCard
            onChoosePlan={handleChoosePlan}
            selectedPlan={selectedPlan}
            plans={plans}
          />
        </div>
      </div>
    );
  }

  return (
    <section>
      <div
        className={`${selectedPlan?.recommended ? "bg-green-900" : "bg-blue-900"} p-9 shadow`}
      />

      <div className="flex items-center justify-center bg-gray-100 md:py-10 lg:py-44">
        <div className="w-full max-w-4xl items-center justify-center gap-8 rounded-lg bg-white p-8 shadow-xl md:flex">
          {/* Left Side: Selected Plan Card */}
          <div className="w-full lg:w-1/2">
            <CheckCard
              handleChoosePlan={handleChoosePlan}
              selectedPlan={selectedPlan}
            />
          </div>

          {/* Right Side: Payment Form */}
          <div className="w-full lg:w-1/2">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
              {t("auth.checkout.payButton")}
            </h2>

            {/* Payment Method Selection */}
            <div className="mb-6 flex overflow-hidden rounded-md border border-gray-300">
              <button
                type="button"
                className={`flex-1 py-3 text-center font-medium transition-colors ${
                  paymentMethod === "ideal"
                    ? "bg-green-100 text-green-700"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setPaymentMethod("ideal")}
              >
                🇳🇱 iDEAL
              </button>
              <button
                type="button"
                className={`flex-1 py-3 text-center font-medium transition-colors ${
                  paymentMethod === "card"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setPaymentMethod("card")}
              >
                💳 {t("auth.checkout.payCard")}
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {t("auth.common.email")}
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                />
              </div>

              {/* Card Payment Section */}
              {paymentMethod === "card" && (
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    {t("auth.register.card")}
                  </label>
                  <div className="rounded-md border border-gray-300 bg-gray-50 p-4">
                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                  </div>
                </div>
              )}

              {/* iDEAL Bank Selection */}
              {paymentMethod === "ideal" && (
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    {t("auth.common.bank")}
                  </label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  >
                    <option value="">{t("Kies uw bank")}</option>
                    {IDEAL_BANKS.map((bank) => (
                      <option key={bank.id} value={bank.id}>
                        {bank.name}
                      </option>
                    ))}
                  </select>
                  <p className="mt-2 text-sm text-gray-500">
                    {t("auth.common.msg")}
                  </p>
                </div>
              )}

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
                disabled={
                  loading ||
                  (paymentMethod === "card" && (!stripe || !elements))
                }
                variant="yellowGradient"
                className="w-full"
                size="lg"
              >
                {`${t("common.applyNow")} ${selectedPlan.price}`}
              </Button>
              {/* Cancel Link */}
              <div className="mt-6 text-center">
                <Link
                  to="/properties"
                  className="text-sm text-blue-500 hover:underline"
                >
                  {t("common.cancelText")}
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

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   setError(null);

//   try {
//     if (!User) throw new Error("User not authenticated");
//     if (!email) throw new Error("Email is required");
//     if (!selectedPlan?.id) throw new Error("No plan selected");

//     // 1️⃣ Create subscription via iDEAL
//     const subscriptionPayload = {
//       email,
//       planId: selectedPlan.id,
//     };

//     const { data: subscriptionData } = await axios.post(
//       "/stripe/create-subscription-card",
//       subscriptionPayload,
//     );

//     console.log("Subscription Response:", subscriptionData);

//     if (!subscriptionData?.success) {
//       throw new Error(subscriptionData?.error || "Subscription failed");
//     }

//     // 2️⃣ Update user ispaid = true on backend
//     const userId = User.id;
//     const { data: userUpdateResponse } = await axios.patch(
//       `/users/${userId}`,
//       {
//         ispaid: true,
//       },
//     );

//     console.log("User updated:", userUpdateResponse);

//     // 3️⃣ Merge into localStorage while preserving token/outer structure
//     const existingUserInfo = JSON.parse(
//       localStorage.getItem("userInfo") || "{}",
//     );
//     const updatedUserInfo = {
//       ...existingUserInfo,
//       data: {
//         ...existingUserInfo.data,
//         ...userUpdateResponse.data,
//         ispaid: true, // ensure it’s true even if backend response is partial
//       },
//     };
//     localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));

//     // Instead of alert(...)
//     navigate("/auth/payment-success", {
//       state: {
//         plan: selectedPlan,
//         planPrice: selectedPlan.price,
//         subscriptionId: subscriptionData.data.subscriptionId,
//         customerId: subscriptionData.data.customerId,
//         userData: userUpdateResponse.data,
//         paymentId: subscriptionData.data.paymentIntentId || null,
//         clientSecret: subscriptionData.data.clientSecret || null,
//         email: User.email,
//       },
//       replace: true,
//     });
//   } catch (err) {
//     console.error("Checkout error:", err);
//     setError(
//       err.response?.data?.error || err.message || "Something went wrong",
//     );
//   } finally {
//     setLoading(false);
//   }
// };

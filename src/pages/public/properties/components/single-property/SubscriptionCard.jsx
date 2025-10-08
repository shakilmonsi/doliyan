import { useState } from "react";
import axios from "../../../../../utils/axiosInstance";

const SubscriptionCard = ({ plans }) => {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (planId) => {
    setLoading(true);

    try {
      const response = await axios.post(`/stripe/create-session`, {
        priceId: planId,
      });

      if (response.data.sessionUrl) {
        window.location.href = response.data.sessionUrl; // redirect to Stripe Checkout
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 md:gap-6">
      {plans.map((plan, index) => (
        <div
          key={index}
          className={`relative flex w-full flex-col justify-between rounded-lg border p-6 text-center shadow-md transition-all hover:shadow-lg ${
            plan.recommended
              ? "border-blue-500 bg-white ring-blue-100"
              : "border-gray-200 bg-white"
          }`}
        >
          {/* Top Section */}
          <div>
            {plan.recommended && (
              <div className="absolute -top-3 right-3 rounded-full bg-blue-800 px-3 py-1 text-xs font-bold text-white">
                Aanbevolen
              </div>
            )}

            <h3 className="mb-1 text-2xl font-bold text-gray-800 capitalize">
              {plan.name}
            </h3>
            <p className="mb-2 text-sm text-gray-500">{plan.description}</p>

            <p className="mb-5 text-2xl font-extrabold text-gray-900">
              {plan.price}
              <span className="text-sm font-normal text-gray-500">/maand</span>
            </p>

            <ul className="mb-6 space-y-2 text-left text-sm text-gray-600">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-1">
                  <span className="">✔</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Button at Bottom */}
          <button
            className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
            onClick={() => handleSubscribe(plan.id)}
            disabled={loading}
          >
            {loading ? "Loading..." : "Subscribe"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionCard;

// const handleSelect = (plan) => {
//   dispatch(selectPlan(plan));
//   navigate("/auth/checkout");
// };

// <button
//   onClick={() => handleSelect(plan)}
//   className={`w-full rounded py-2 text-sm font-medium transition focus:ring-2 focus:ring-offset-2 focus:outline-none ${
//     plan.recommended
//       ? "bg-blue-800 text-white hover:bg-blue-500 focus:ring-blue-500"
//       : "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300"
//   }`}
// >
//   Kies Premium
// </button>;

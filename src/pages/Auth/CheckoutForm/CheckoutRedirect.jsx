import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { STORAGE } from "../../../utils/storage";
import { getCurrentUser } from "../../../features/auth/authUtils";
import { UPDATE_USER_PAYMENT_STATUS_THUNK } from "../../../features/subscriptions/subscriptionThunk";
import axios from "../../../utils/axiosInstance";
import SuccessComponent from "./components/SuccessComponent";

const CheckoutRedirect = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading"); // "loading" | "success" | "failed"
  const [sessionData, setSessionData] = useState(null);
  const sessionId = searchParams.get("session_id");
  const dispatch = useDispatch();
  const user = getCurrentUser();

  const updateUserLocalStorage = async () => {
    const existingUserInfo = STORAGE.getUser() || {};

    const updatedUserInfo = {
      ...existingUserInfo,
      ispaid: true,
    };

    STORAGE.setUser(updatedUserInfo);
  };

  const updateUserDatabase = async (userId) => {
    await dispatch(UPDATE_USER_PAYMENT_STATUS_THUNK({ userId }));
  };

  useEffect(() => {
    if (!sessionId) return;

    const fetchSession = async () => {
      try {
        const res = await axios.get(
          `/stripe/get-checkout-session/${sessionId}`,
        );

        const data = res.data;
        const userId = user.id;

        setSessionData(data);

        if (data.session.payment_status === "paid") {
          await updateUserLocalStorage();
          await updateUserDatabase(userId);
          setStatus("success");
        } else {
          setStatus("failed");
        }
      } catch (err) {
        console.error(err);
        setStatus("failed");
      }
    };

    fetchSession();
  }, [sessionId]);

  if (status === "success") {
    return <SuccessComponent sessionData={sessionData} />;
  }

  if (status === "failed") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-red-600">Payment failed or not completed.</p>
      </div>
    );
  }

  // Loading / redirecting state
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl md:p-12">
        <div className="mb-6">
          <div className="inline-flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-blue-100">
            <svg
              className="h-8 w-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <h1 className="mb-2 text-2xl font-bold text-gray-800">
          Redirecting to Payment
        </h1>
        <p className="mb-6 text-gray-600">
          Please wait while we securely redirect you to your bank for payment.
        </p>

        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
          </div>
        </div>

        <div className="mb-6 rounded-lg bg-blue-50 p-4">
          <p className="text-sm font-medium text-blue-800">
            Do not close this window or press back button
          </p>
        </div>

        <div className="flex items-center justify-center space-x-2 text-gray-500">
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-gray-300"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-gray-300"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-gray-300"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutRedirect;

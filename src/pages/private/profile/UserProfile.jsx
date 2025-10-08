import { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import { getCurrentUser } from "../../../features/auth/authUtils";
import { useLanguage } from "../../../hook/useLanguage";
import Warning from "../../../components/ui/Warning";
import {
  formatPaymentHistory,
  formatSubscriptionForUI,
  getLatestActiveSubscription,
} from "../../../utils/userHelpers";
import { GET_USER_API } from "../../../features/auth/authAPI";
import CardSkeleton from "../../../components/common/Card-Skeleton";
import Loading from "../../../components/ui/Loading";
// import LoadingSpinner from "../../../components/ui/LoadingSpinner";
// import ErrorMessage from "../../../components/ui/ErrorMessage";

// Constants for better maintainability
const PROFILE_IMAGE_PATH = "/image/random/profile.jpg";
const PROFILE_IMAGE_ALT = "Profile";

const UserProfile = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = getCurrentUser()?.id;

  const fetchUser = useCallback(async () => {
    if (!userId) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await GET_USER_API(userId);

      if (response?.data) {
        setUser(response.data);
      } else {
        setError("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError(error.message || "Failed to load user profile");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Memoize derived data to prevent unnecessary recalculations
  const {
    isPaid,
    userName,
    email,
    subscription,
    paymentHistory,
    hasPaymentHistory,
  } = useMemo(() => {
    if (!user) {
      return {
        isPaid: false,
        userName: "",
        email: "",
        subscription: null,
        paymentHistory: [],
        hasPaymentHistory: false,
      };
    }

    const latestSubscription = getLatestActiveSubscription(user.subscriptions);
    const formattedSubscription = formatSubscriptionForUI(latestSubscription);
    const formattedPaymentHistory = formatPaymentHistory(user.subscriptions);

    return {
      isPaid: user.ispaid || false,
      userName: user.name?.en || user.name || "",
      email: user.email || "",
      subscription: formattedSubscription,
      paymentHistory: formattedPaymentHistory,
      hasPaymentHistory: formattedPaymentHistory.length > 0,
    };
  }, [user]);

  const navigateToPricing = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  if (loading) {
    return <Loading />;
  }

  // if (error) {
  //   return <ErrorMessage message={error} onRetry={fetchUser} />;
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="h-24 bg-[#0C205A] pt-18" />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-0">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            <MembershipCard
              isPaid={isPaid}
              subscription={subscription}
              onUpgrade={navigateToPricing}
              t={t}
            />

            {isPaid && hasPaymentHistory && (
              <PaymentHistoryTable paymentHistory={paymentHistory} t={t} />
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <ProfileCard
              userName={userName}
              email={email}
              profileImage={PROFILE_IMAGE_PATH}
              t={t}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

// Extracted components for better organization and reusability
const MembershipCard = ({ isPaid, subscription, onUpgrade, t }) => {
  return (
    <>
      {!isPaid && <Warning />}

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-medium text-gray-900">
            {t("profile.left.title")}
          </h3>
        </div>

        <div className="px-6 py-4">
          <div className="sm:grid-c-2 grid grid-cols-1 gap-4">
            <PaymentStatus isPaid={isPaid} t={t} />

            {!isPaid ? (
              <UpgradeButton onUpgrade={onUpgrade} t={t} />
            ) : (
              <SubscriptionDetails subscription={subscription} t={t} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const PaymentStatus = ({ isPaid, t }) => (
  <div>
    <p className="text-sm font-medium text-gray-500">
      {t("profile.left.PaymentStatus")}
    </p>
    <p
      className={
        isPaid ? "font-semibold text-green-600" : "font-semibold text-red-600"
      }
    >
      {isPaid ? t("profile.left.active") : t("profile.left.inactive")}
    </p>
  </div>
);

const UpgradeButton = ({ onUpgrade, t }) => (
  <div className="flex justify-start sm:justify-end">
    <Button
      variant="yellowGradient"
      className="w-50"
      onClick={onUpgrade}
      aria-label="Upgrade plan"
    >
      {t("userProfile.activePlan")}
    </Button>
  </div>
);

const SubscriptionDetails = ({ subscription, t }) => (
  <>
    <div>
      <p className="text-sm font-medium text-gray-500">
        {t("userProfile.plan")}
      </p>
      <p className="text-sm text-gray-900 capitalize">
        {(subscription?.planName === "Premium" && t("userProfile.premium")) ||
          (subscription?.planName === "Free" && t("userProfile.free")) ||
          subscription?.planName ||
          "N/A"}
      </p>
    </div>

    <div>
      <p className="text-sm font-medium text-gray-500">
        {t("userProfile.paymentMethod")}
      </p>
      <p className="text-sm text-gray-900">
        {subscription?.paymentMethod || t("userProfile.card")}
      </p>
    </div>

    <div>
      <p className="text-sm font-medium text-gray-500">
        {t("userProfile.billing")}
      </p>
      <p className="text-sm text-gray-900 capitalize">
        {subscription?.planInterval === "month" && t("userProfile.month")}
        {subscription?.planInterval === "year" && t("userProfile.year")}
        {!subscription?.planInterval && "N/A"}
      </p>
    </div>

    <div>
      <p className="text-sm font-medium text-gray-500">
        {t("userProfile.nextPayment")}
      </p>
      <p className="text-sm text-gray-900">
        {subscription?.nextPaymentDate || "N/A"}
      </p>
    </div>
  </>
);

const PaymentHistoryTable = ({ paymentHistory, t }) => (
  <div className="overflow-hidden rounded-lg bg-white shadow">
    <div className="border-b border-gray-200 px-6 py-4">
      <h3 className="text-lg font-medium text-gray-900">
        {t("userProfile.paymentHistory")}
      </h3>
    </div>

    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {["date", "amount", "method", "status", "receipt"].map((header) => (
              <th
                key={header}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
              >
                {t(`userProfile.${header}`)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 bg-white">
          {paymentHistory.map((payment) => (
            <PaymentHistoryRow key={payment.id} payment={payment} t={t} />
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const PaymentHistoryRow = ({ payment, t }) => (
  <tr>
    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
      {payment.date}
    </td>
    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
      €{payment.amount}
    </td>
    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
      {payment.method}
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <PaymentStatusBadge status={payment.status} t={t} />
    </td>
    <td className="px-6 py-4 text-center text-sm font-medium whitespace-nowrap">
      <ReceiptLink receiptUrl={payment.receiptUrl} t={t} />
    </td>
  </tr>
);

const PaymentStatusBadge = ({ status, t }) => (
  <span
    className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
      status === "Paid"
        ? "bg-green-100 text-green-800"
        : "bg-red-100 text-red-800"
    }`}
  >
    {status === "Paid" ? t("userProfile.paid") : t("userProfile.failed")}
  </span>
);

const ReceiptLink = ({ receiptUrl, t }) =>
  receiptUrl ? (
    <a
      href={receiptUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-amber-600 hover:text-amber-900"
      aria-label="Download receipt"
    >
      {t("userProfile.download")}
    </a>
  ) : (
    <span className="text-gray-400">{t("userProfile.unavailable")}</span>
  );

const ProfileCard = ({ userName, email, profileImage, t }) => (
  <div className="overflow-hidden rounded-lg bg-white shadow">
    <div className="border-b border-gray-200 px-6 py-4">
      <h3 className="text-lg font-medium text-gray-900">
        {t("profile.right.title")}
      </h3>
    </div>

    <div className="px-6 py-4">
      <div className="flex items-center">
        <img
          className="h-14 w-14 rounded-full border-2 border-white object-contain shadow-sm"
          src={profileImage}
          alt={PROFILE_IMAGE_ALT}
          onError={(e) => {
            e.target.src = "/default-profile.png";
          }}
        />
        <div className="ml-4">
          <h2 className="text-lg font-semibold text-gray-900">{userName}</h2>
        </div>
      </div>

      <div className="my-4 space-y-3">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {t("profile.right.email")}
          </p>
          <p className="text-sm text-gray-900">{email}</p>
        </div>
      </div>

      <Button variant="yellowGradient" type="button" aria-label="Edit profile">
        {t("profile.right.button")}
      </Button>
    </div>
  </div>
);

export default UserProfile;

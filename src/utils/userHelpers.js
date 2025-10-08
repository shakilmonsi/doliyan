/**
 * Returns the latest active subscription from an array of subscriptions
 */
export const getLatestActiveSubscription = (subscriptions) => {
  if (!subscriptions || subscriptions.length === 0) return null;

  return subscriptions
    .filter((sub) => sub.planStatus === "active")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )[0];
};

/**
 * Formats subscription into clean object for UI
 */
export const formatSubscriptionForUI = (subscription) => {
  if (!subscription) return null;

  return {
    planName: subscription.planName || "N/A",
    planInterval: subscription.planInterval || "N/A",
    paymentMethod: subscription.paymentMethod || "Card",
    startedAt: subscription.createdAt
      ? new Date(subscription.createdAt).toLocaleDateString()
      : "N/A",
    invoiceUrl: subscription.invoiceUrl || null,
    planAmount: subscription.planAmount || 0,
    status: subscription.planStatus || "inactive",
  };
};

/**
 * Formats all subscriptions into a payment history array for UI
 */
export const formatPaymentHistory = (subscriptions) => {
  if (!subscriptions) return [];

  return subscriptions.map((sub) => ({
    id: sub.id,
    date: sub.createdAt ? new Date(sub.createdAt).toLocaleDateString() : "N/A",
    method: sub.paymentMethod || "Card",
    status: sub.planStatus === "active" ? "Paid" : "Failed",
    amount: (sub.planAmount || 0).toFixed(2),
    receiptUrl: sub.invoiceUrl || null,
  }));
};

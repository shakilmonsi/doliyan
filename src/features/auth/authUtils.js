import { STORAGE } from "../../utils/storage";

// Save user to localStorage
export const saveCurrentUser = (user) => {
  STORAGE.setUser(user);
};

// Get the full user object
export const getCurrentUser = () => {
  const user = STORAGE.getUser();
  // Handle different data structures that might be returned from storage
  const userData = user?.data || user;
  return userData || null;
};

// Get subscriptions array
export const getUserSubscriptions = () => {
  const user = STORAGE.getSubscription();
  return user || [];
};

// Get active subscription plan name
export const getPlanName = () => {
  const activePlanName = getUserSubscriptions();

  if (!activePlanName || !activePlanName.length) return null;

  const activePlan =
    activePlanName.find(
      (sub) => sub.planName === "Free" || sub.planName === "Premium",
    )?.planName || null;

  return activePlan;
};

// Get active subscription plan name
export const getActivePlan = () => {
  const subscriptions = STORAGE.getSubscription();

  if (!subscriptions || !subscriptions.length) return null;

  const activePlan =
    subscriptions.find((sub) => sub.planStatus === "active")?.planName || null;

  return activePlan;
};

// Logout user
export const logout = () => {
  STORAGE.clearAll();
};

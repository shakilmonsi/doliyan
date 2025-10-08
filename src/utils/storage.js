import { STORAGE_KEYS } from "../constants/local_storage_const";

const getItem = (key) => localStorage.getItem(key);
const setItem = (key, value) => localStorage.setItem(key, value);
const removeItem = (key) => localStorage.removeItem(key);

export const STORAGE = {
  // USER
  getUser: () => {
    const user = getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },
  setUser: (user) => setItem(STORAGE_KEYS.USER, JSON.stringify(user)),
  clearUser: () => removeItem(STORAGE_KEYS.USER),

  // TOKEN
  getToken: () => getItem(STORAGE_KEYS.TOKEN),
  setToken: (token) => setItem(STORAGE_KEYS.TOKEN, token),
  clearToken: () => removeItem(STORAGE_KEYS.TOKEN),

  // SUBSCRIPTION
  getSubscription: () => JSON.parse(getItem(STORAGE_KEYS.SUBSCRIPTION)),
  setSubscription: (sub) =>
    setItem(STORAGE_KEYS.SUBSCRIPTION, JSON.stringify(sub)),
  clearSubscription: () => removeItem(STORAGE_KEYS.SUBSCRIPTION),

  //ACTIVE PLAN
  getActivePlan: () => {
    const subscriptions = JSON.parse(getItem(STORAGE_KEYS.SUBSCRIPTION));

    return subscriptions
      ? subscriptions.find((sub) => sub.planStatus === "active")?.planName
      : null;
  },

  getPropertyIds: () => {
    const ids = getItem(STORAGE_KEYS.PROPERTY_IDS);
    return ids ? JSON.parse(ids) : [];
  },
  setPropertyIds: (ids) =>
    setItem(STORAGE_KEYS.PROPERTY_IDS, JSON.stringify(ids)),
  clearPropertyIds: () => removeItem(STORAGE_KEYS.PROPERTY_IDS),

  clearAll: () => {
    Object.values(STORAGE_KEYS).forEach((key) => removeItem(key));
  },
};

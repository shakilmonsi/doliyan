export const PLAN_FEATURES = {
  free: {
    canExport: false,
    maxListings: 10,
    prioritySupport: false,
  },
  premium: {
    canExport: true,
    maxListings: Infinity,
    prioritySupport: true,
    customBranding: true,
  },
  enterprise: {
    canExport: true,
    maxListings: Infinity,
    prioritySupport: true,
    customBranding: true,
  },
};

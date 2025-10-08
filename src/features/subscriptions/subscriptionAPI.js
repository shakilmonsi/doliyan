import axios from "../../utils/axiosInstance";

//===================================================
// CREATE SUBSCRIPTION CARD
//===================================================
export const createSubscriptionCard = async (subscriptionPayload) => {
  const response = await axios.post(
    `/stripe/create-subscription-card`,
    subscriptionPayload,
  );
  return response.data;
};

//===================================================
// GET SUBSCRIPTION IDEAL
//===================================================
export const createSubscriptionIdeal = async (subscriptionPayload) => {
  const response = await axios.post(
    `/stripe/create-subscription-ideal`,
    subscriptionPayload,
  );
  return response.data;
};

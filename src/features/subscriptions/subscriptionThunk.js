import { createAsyncThunk } from "@reduxjs/toolkit";
import { UPDATE_USER_API } from "../auth/authAPI";
import { STORAGE } from "../../utils/storage";

// ====================================================||
// ✅ UPDATE USER PAYMENT STATUS
// ====================================================||
export const UPDATE_USER_PAYMENT_STATUS_THUNK = createAsyncThunk(
  "auth/updateUserPaymentStatus",
  async ({ userId }, { rejectWithValue }) => {
    try {
      // 1️⃣ Call backend to update user payment status
      const response = await UPDATE_USER_API(userId, {
        ispaid: true,
      });
      console.log("Payment update response:", response.data);
      const { subscriptions, ...user } = response.data;

      // 👤 Save updated user info
      STORAGE.setUser({ ...user, ispaid: true });

      // 📦 Save subscription details
      if (subscriptions?.length) {
        STORAGE.setSubscription(subscriptions);
      }

      // 🧹 If Premium → clear property limit
      // if (planId === "Premium") {
      //   localStorage.removeItem("app_property_id");
      // }

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update payment status!",
      );
    }
  },
);

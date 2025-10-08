// src/features/subscription/subscriptionSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { STORAGE } from "../../utils/storage";

const initialState = {
  selectedPlan: null,
  subscriptionPlan: STORAGE.getSubscription() || null,
  activePlan: STORAGE.getActivePlan() || null,
  isSubscribed: false,
  subscriptionDate: null,
  expiryDate: null,
};

const subscriptionSlice = createSlice({
  name: "selectedPlan",
  initialState,
  reducers: {
    selectPlan: (state, action) => {
      state.selectedPlan = action.payload;
      localStorage.setItem("selectedPlan", JSON.stringify(action.payload));
    },

    subscribe: (state, action) => {
      const today = new Date();
      const expiry = new Date();
      expiry.setMonth(expiry.getMonth() + 1); // 1-month subscription
      state.isSubscribed = true;
      state.subscriptionDate = today.toISOString();
      state.expiryDate = expiry.toISOString();
      state.selectedPlan = action.payload; // save plan on subscribe
    },

    logoutReset: (state) => {
      state.selectedPlan = null;
      state.isSubscribed = false;
      state.subscriptionDate = null;
      state.expiryDate = null;
      STORAGE.clearSubscription();
    },
  },
});

export const { selectPlan, subscribe, logoutReset } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;

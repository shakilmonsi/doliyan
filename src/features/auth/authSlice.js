import { createSlice } from "@reduxjs/toolkit";
import {
  LOGING_USER_THUNK,
  REGISTER_USER_THUNK,
  FORGOT_PASSWORD_THUNK,
} from "./authThunk";
import { STORAGE } from "../../utils/storage";

const initialState = {
  user: STORAGE.getUser() || null,
  token: STORAGE.getToken() || null,
  isAuthenticated: !!STORAGE.getToken(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // Use STORAGE utility to clear everything consistently
      STORAGE.clearAll();
    },

    resetForgotPasswordState: (state) => {
      state.forgotPasswordSuccess = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // =====================================
      // LOGIN CASE
      // =====================================
      .addCase(LOGING_USER_THUNK.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LOGING_USER_THUNK.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(LOGING_USER_THUNK.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =====================================
      // REGISTER CASE
      // =====================================
      .addCase(REGISTER_USER_THUNK.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(REGISTER_USER_THUNK.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(REGISTER_USER_THUNK.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =====================================
      // FORGET-PASSWORD CASE
      // =====================================
      .addCase(FORGOT_PASSWORD_THUNK.pending, (state) => {
        state.loading = true;
        state.forgotPasswordSuccess = false;
      })
      .addCase(FORGOT_PASSWORD_THUNK.fulfilled, (state, action) => {
        console.log("FORGET-PASSWORD CASE: ", action);
        state.loading = false;
        state.forgotPasswordSuccess = true; // ← Critical: set to true
      })
      .addCase(FORGOT_PASSWORD_THUNK.rejected, (state) => {
        state.loading = false;
        state.forgotPasswordSuccess = false;
      });
  },
});

export const { logout, resetForgotPasswordState } = authSlice.actions;
export default authSlice.reducer;

import { createAsyncThunk } from "@reduxjs/toolkit";

import { LOGIN_API, REGISTER_API, FORGOT_PASSWORD_API } from "./authAPI";
import { STORAGE } from "../../utils/storage";

//=================================================================================||
// ✅ 👤 LOGIN USER
//=================================================================================||
const LOGING_USER_THUNK = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await LOGIN_API({ email, password });
      const { token, subscriptions, ...user } = response.data;

      // 🔒 Save token
      STORAGE.setToken(token);
      // 👤 Save user
      STORAGE.setUser(user);
      // 📦 Save subscription details
      if (subscriptions?.length) {
        STORAGE.setSubscription(subscriptions);
      }

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed!");
    }
  },
);

//=================================================================================||
// ✅ 👤 REGISTER USER
//=================================================================================||
const REGISTER_USER_THUNK = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await REGISTER_API({ name, email, password });
      console.log("Thunk Response-register:", response);

      const { token, subscriptions, ...user } = response.data;

      // 🔒 Save token separately
      STORAGE.setToken(token);

      // 👤 Save user (without sensitive info)
      STORAGE.setUser(user);

      // 📦 Save subscription details
      if (subscriptions?.length) {
        STORAGE.setSubscription(subscriptions);
      }

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed!",
      );
    }
  },
);

//=================================================================================||
// ✅ 👤 FORGET PASSWORD
//=================================================================================||
const FORGOT_PASSWORD_THUNK = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await FORGOT_PASSWORD_API(email);

      console.log("line-46: response: ", response);

      // Check if the response indicates failure
      if (response.status === "fail") {
        return rejectWithValue(response.message || "Email not found");
      }

      // If successful, return the response data
      return response;
    } catch (err) {
      // Handle Axios errors
      if (err.response) {
        // Server responded with error status code
        const errorData = err.response.data;

        return rejectWithValue(
          errorData.message ||
            errorData.error?.message ||
            "Password reset request failed",
        );
      } else if (err.request) {
        // Request was made but no response received
        return rejectWithValue("Network error - no server response");
      } else {
        // Other errors
        return rejectWithValue(err.message || "Failed to send reset link");
      }
    }
  },
);

export { LOGING_USER_THUNK, REGISTER_USER_THUNK, FORGOT_PASSWORD_THUNK };

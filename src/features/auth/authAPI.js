// src/features/auth/authAPI.js
import axios from "../../utils/axiosInstance";

//===================================================
// LOGIN USER
//===================================================
const LOGIN_API = async ({ email, password }) => {
  try {
    const res = await axios.post(`/users/login`, { email, password });

    const data = res.data;

    return data;
  } catch (error) {
    console.error("LOGIN_API error:", error);
    throw error.response?.data || error; // pass structured error back
  }
};

//===================================================
// REGISTER USER
//===================================================
const REGISTER_API = async ({ name, email, password }) => {
  try {
    const res = await axios.post(`/users/create`, {
      name,
      email,
      password,
    });

    const data = res.data;

    return data;
  } catch (error) {
    console.error("REGISTER_API error:", error);
    throw error.response?.data || error;
  }
};

//===================================================
// FORGET USER PASSWORD
//===================================================
const FORGOT_PASSWORD_API = async (email) => {
  try {
    const res = await axios.post(`/users/forgot-password`, { email });
    console.log("FORGOT_PASSWORD_API response:", res.data);
    return res.data; // usually contains { status, message }
  } catch (error) {
    console.error("FORGOT_PASSWORD_API error:", error);
    throw error.response?.data || error; // pass back API error
  }
};

//===================================================
// GET USER
//===================================================
const GET_USER_API = async (id) => {
  try {
    const res = await axios.get(`/users/${id}`);
    return res.data;
  } catch (error) {
    console.error("GET_USER_API error:", error);
    throw error.response?.data || error;
  }
};

//===================================================
// UPDATE USER
//===================================================
const UPDATE_USER_API = async (id, userData) => {
  try {
    const res = await axios.patch(`/users/${id}`, userData);
    return res.data;
  } catch (error) {
    console.error("UPDATE_USER_API error:", error);
    throw error.response?.data || error;
  }
};

export {
  LOGIN_API,
  REGISTER_API,
  FORGOT_PASSWORD_API,
  GET_USER_API,
  UPDATE_USER_API,
};

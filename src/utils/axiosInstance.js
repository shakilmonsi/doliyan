// axios.js
import axios from "axios";
import i18n from "../i18n";
import { STORAGE } from "./storage";

const instance = axios.create({
  // baseURL: "http://localhost:3011/api",
  baseURL: "https://backend.huurscanner.nl/api",
});

// Request Interceptor: Attach language and token
instance.interceptors.request.use(
  (config) => {
    // Get current language
    const language = i18n.language || "nl";

    // Get token from localStorage
    const token = STORAGE.getToken();

    // Attach headers
    config.headers["Accept-Language"] = language;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;

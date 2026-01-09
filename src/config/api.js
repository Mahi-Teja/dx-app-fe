import axios from "axios";
import { store } from "@/app/store/store.js";
import { performLogout } from "@/features/auth/store/logout.thunk.js";

// Read from env
const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1`;

/**
 * ---------------------------------------------------
 * Axios Instance
 * ---------------------------------------------------
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // REQUIRED for cookie auth
  timeout: 15000,
});

/* ---------------------------------------------------
   REQUEST INTERCEPTOR
--------------------------------------------------- */
api.interceptors.request.use(
  (config) => {
    // Attach timezone automatically (triggers preflight)
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

    config.headers["X-Timezone"] = tz;

    return config;
  },
  (error) => Promise.reject(error)
);

/* ---------------------------------------------------
   RESPONSE INTERCEPTOR
--------------------------------------------------- */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If CORS/network error, error.response will be undefined
    if (!error.response) {
      return Promise.reject(error);
    }

    const status = error.response.status;

    // Auto logout on auth failure
    if (status === 401) {
      try {
        await store.dispatch(performLogout());
      } catch (e) {
        console.warn("Auto logout failed", e);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

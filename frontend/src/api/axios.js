import axios from "axios";
import authEvents from "./authEvents.js";

const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
const api = axios.create({
  baseURL: `${backendURL}/api/v1`,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
let failedRequestQueue = [];

const processQueue = (error) => {
  failedRequestQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve();
  });
  failedRequestQueue = [];
};



api.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (!error.response || !error.config) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    // ✅ Prevent interceptor from catching the refresh call itself
    if (originalRequest.url?.includes('/user/refresh-token')) {
      redirectToLogin();
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequestQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // ✅ Plain axios — not the `api` instance — avoids interceptor loop
        await axios.post(
          'http://localhost:8000/api/v1/user/refresh-token',
          {},
          { withCredentials: true }   // ✅ still sends cookies
        );
        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
              authEvents.logout() // ✅ now actually fires
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
import { AppStore } from "@store/index";
import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import type { AxiosError } from "axios";
let store: AppStore; // Reference to the Redux store

export const setStore = (s: AppStore) => {
  store = s;
};

const api = axios.create({
  baseURL: 'http://localhost:3000/v1',
  withCredentials: true,
});

// Request Interceptor
const requestInterceptor = (config:InternalAxiosRequestConfig) => {
  const token = store.getState().AuthSlice.jwt;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
};

// Response Interceptor
const responseInterceptor = async (error: AxiosError) => {
  const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const refreshResponse = await api.post("/users/fresh");
      const { accessToken: newAccessToken } = refreshResponse.data;

      store.dispatch({ type: "AuthSlice/setAccessToken", payload: newAccessToken });

      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      store.dispatch({ type: "AuthSlice/logOut" });
      return Promise.reject(refreshError);
    }
  }
  return Promise.reject(error);
};

// Attach interceptors
api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use((response) => response, responseInterceptor);

export default api;
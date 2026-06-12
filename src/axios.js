import axios from "axios";
import store from "./redux/store";

const axoisApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axoisApi.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axoisApi;

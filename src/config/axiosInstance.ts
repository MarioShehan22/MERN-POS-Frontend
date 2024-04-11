import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import BASE_URL from "./ApiConfig";

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL
});

instance.interceptors.request.use(
  (config) => {
    let token = document.cookie.split('; ').find(record => record.startsWith('token=')) || null;
    if (token) {
      const tokenValue = token.split('=')[1];
      config.headers.Authorization = tokenValue;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
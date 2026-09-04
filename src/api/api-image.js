import axios from "axios";

export const apiImage = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL + "/api",
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

apiImage.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
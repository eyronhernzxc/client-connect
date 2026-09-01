import axios from "axios";

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_APP_API_URL
      ? `${import.meta.env.VITE_APP_API_URL}/api`
      : "http://localhost:8000/api",

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
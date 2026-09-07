
import { api } from "./api";

// Get currently authenticated user
export const getCurrentUser = async () => {
  try {
    const response = await api.get("/auth/me");
    const user = response.data;

    console.log("Authenticated user from /auth/me:", user);

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }

    return user;
  } catch (error) {
    console.error(
      "GET /auth/me failed:",
      error.response?.data || error
    );

    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Unable to retrieve authenticated user.";

    throw new Error(message);
  }
};

// Logout currently authenticated user
export const logoutUser = async () => {
  try {
    const response = await api.post("/auth/logout");

    // Remove locally stored user
    localStorage.removeItem("user");

    // If you also store a token, remove it here
    localStorage.removeItem("token");

    return response.data;
  } catch (error) {
    console.error(
      "POST /auth/logout failed:",
      error.response?.data || error
    );

    // Remove local auth data even if the API request fails
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Unable to logout.";

    throw new Error(message);
  }
};


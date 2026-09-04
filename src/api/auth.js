
import { api } from "./api";

// Get currently authenticated user
export const getCurrentUser = async () => {
  try {
    const response = await api.get("/auth/me");

    const user = response.data;

    console.log("Authenticated user from /auth/me:", user);

    // Save the latest user information locally
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


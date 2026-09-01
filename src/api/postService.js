
import { api } from "./api.js";

export async function postService(applicationData) {
  try {
    const { data } = await api.post(
      "/application-services",
      applicationData
    );

    return data;
  } catch (error) {
    console.error(
      "POST /application-services failed:",
      error.response?.data || error
    );

    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Failed to create application.";

    throw new Error(message);
  }
}


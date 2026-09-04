import { api } from "./api";

export const postFinancial = async (data) => {
  try {
    const response = await api.post("/financial-informations", data);

    console.log("Financial API response:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "POST /financial failed:",
      error.response?.data || error
    );

    throw error;
  }
};
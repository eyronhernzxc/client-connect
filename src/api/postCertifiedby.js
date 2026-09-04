import { api } from "./api.js";

export const postCertifiedBy = async (data) => {
    try {
        const response = await api.post(
            "/certified-by",
            data
        );

        return response.data;
    } catch (error) {
        const message =
            error.response?.data?.message ||
            "Failed to submit certification";

        throw new Error(message);
    }
};
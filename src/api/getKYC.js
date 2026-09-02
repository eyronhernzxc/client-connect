import { api } from "./api.js";

export const getKYC = async () => {
    try {
        const response = await api.get("/kyc-questions");

        return response.data;
    } catch (error) {
        const message =
            error.response?.data?.message ||
            "Failed to fetch KYC questions";

        throw new Error(message);
    }
};
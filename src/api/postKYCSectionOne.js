import { api } from "./api.js";

export const postKYCSectionOne = async (data) => {
    try {
        const response = await api.post(
            "/kyc-section-ones",
            data
        );

        return response.data;
    } catch (error) {
        const message =
            error.response?.data?.message ||
            "Failed to submit KYC Section One";

        throw new Error(message);
    }
};
import { api } from "./api";

export const postAddress = async (present_address, permanent_address) => {
    try {
        const presentResponse = await api.post(
            "/address",
            present_address
        );

        const permanentResponse = await api.post(
            "/address",
            permanent_address
        );

        return {
            present: presentResponse.data,
            permanent: permanentResponse.data,
        };

    } catch (error) {
        console.error("Failed to submit address");
        throw error;
    }
};
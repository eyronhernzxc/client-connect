import { api } from "./api.js";

export const postKYCAnswer = async (data) => {
    try {
        const response = await api.post(
            "/kyc-answers",
            {
                company_id:
                    data.company_id,

                kyc_question_id:
                    data.kyc_question_id,

                answer:
                    data.answer,

                if_yes:
                    data.if_yes ?? null,
            }
        );

        return response.data;
    } catch (error) {
        const message =
            error.response?.data?.message ||
            "Failed to submit KYC answer";

        throw new Error(message);
    }
};
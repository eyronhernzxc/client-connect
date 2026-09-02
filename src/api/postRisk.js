import { api } from "./api.js";

/* Create the Product Services Questionnaire. POST /api/product-services-questionnaires */
export const createProductServicesQuestionnaire = async (profileId) => {
    const response = await api.post(
        "/product-services-questionnaires",
        {
            profile_id: profileId,
        }
    );

    return response.data;
};

/* Create the Risk Assessment Questionnaire. POST /api/risk-assessment-questionnaires */
export const createRiskAssessmentQuestionnaire = async ({
    productServicesQuestionnaireId,
    declaration,
}) => {
    const response = await api.post(
        "/risk-assessment-questionnaires",
        {
            product_services_questionnaire_id:
                productServicesQuestionnaireId,
            declaration,
        }
    );

    return response.data;
};

/* Create one questionnaire answer. POST /api/questionnaire-answers */
export const createQuestionnaireAnswer = async ({
    riskAssessmentQuestionnaireId,
    questionnaireQuestionId,
    answer,
    remarks = "",
}) => {
    const response = await api.post(
        "/questionnaire-answers",
        {
            risk_assessment_questionnaire_id:
                riskAssessmentQuestionnaireId,
            questionnaire_question_id:
                questionnaireQuestionId,
            answer,
            remarks,
        }
    );

    return response.data;
};
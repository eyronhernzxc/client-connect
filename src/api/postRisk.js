import { api } from "./api.js";

/* POST /api/risk-assessment-profiles */
export const createRiskAssessmentProfile = async ({
    companyId,
    businessNature,
    wealthSource,
    monthlyGrossIncome,
    annualGrossIncome,
    transactionPerDay,
    totalAmountPerDay,
    transactionPerMonth,
    totalAmountPerMonth,
    connectedCountry,
    politicallyExposedPerson,
    regulatedByBsp,
    anonymityBoundaryRegistration,
}) => {
    const response = await api.post(
        "/risk-assessment-profiles",
        {
            company_id: companyId,
            business_nature: businessNature,
            wealth_source: wealthSource,
            monthly_gross_income: monthlyGrossIncome,
            annual_gross_income: annualGrossIncome,
            transaction_per_day: transactionPerDay,
            total_amount_per_day: totalAmountPerDay,
            transaction_per_month: transactionPerMonth,
            total_amount_per_month: totalAmountPerMonth,
            connected_country: connectedCountry,
            politically_exposed_person: politicallyExposedPerson,
            regulated_by_bsp: regulatedByBsp,
            anonymity_boundary_registration: anonymityBoundaryRegistration,
        }
    );

    return response.data;
};

/* POST /api/client-certifications */
export const createClientCertification = async ({
    companyId,
    riskAssessmentProfileId,
    name,
    designation,
    date,
    signature,
}) => {
    const response = await api.post(
        "/client-certifications",
        {
            company_id: companyId,
            risk_assessment_profile_id: riskAssessmentProfileId,
            name,
            designation,
            date,
            signature,
        }
    );

    return response.data;
};

/* POST /api/pisopay-certifications */
export const createPisoPayCertification = async ({
    userId,
    riskAssessmentProfileId,
    assessedAndScreenedBy,
    assessedAndScreenedDate,
    assessedAndScreenedTime,
    acknowledgedBy,
    acknowledgedDate,
    acknowledgedTime,
}) => {
    const response = await api.post(
        "/pisopay-certifications",
        {
            user_id: userId,
            risk_assessment_profile_id: riskAssessmentProfileId,
            assessed_and_screened_by: assessedAndScreenedBy,
            assessed_and_screened_date: assessedAndScreenedDate,
            assessed_and_screened_time: assessedAndScreenedTime,
            acknowledged_by: acknowledgedBy,
            acknowledged_date: acknowledgedDate,
            acknowledged_time: acknowledgedTime,
        }
    );

    return response.data;
};

/* POST /api/questionnaire-answers */
export const createQuestionnaireAnswer = async ({
    riskAssessmentProfileId,
    userId,
    questionnaireQuestionId,
    answer,
    scoreIndex,
    remarks = "",
}) => {
    const response = await api.post(
        "/questionnaire-answers",
        {
            risk_assessment_profile_id: riskAssessmentProfileId,
            user_id: userId,
            questionnaire_question_id: questionnaireQuestionId,
            answer,
            score_index: scoreIndex,
            remarks,
        }
    );

    return response.data;
};

/* POST /api/questionnaire-questions */
export const createQuestionnaireQuestion = async ({
    questionnaireCategoryId,
    question,
}) => {
    const response = await api.post(
        "/questionnaire-questions",
        {
            questionnaire_category_id: questionnaireCategoryId,
            question,
        }
    );

    return response.data;
};

/* POST /api/questionnaire-categories */
export const createQuestionnaireCategory = async ({ title }) => {
    const response = await api.post(
        "/questionnaire-categories",
        {
            title,
        }
    );

    return response.data;
};
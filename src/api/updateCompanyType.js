const API_BASE_URL = "http://192.168.122.200:8000/api";

// This is part of the categorization onboarding modal.
// This is the api.js responsible for updating the company type.
export async function updateCompanyType(companyId, companyTypeId) {
  const response = await fetch(`${API_BASE_URL}/company-types`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      company_id: companyId,
      company_type_id: companyTypeId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update company type");
  }

  return response.json();
}
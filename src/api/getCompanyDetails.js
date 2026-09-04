const API_BASE_URL = "http://192.168.122.200:8000/api";

export async function getCompanyDetails() {
  const response = await fetch(
    `${API_BASE_URL}/company-details`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch company details");
  }

  return response.json();
}
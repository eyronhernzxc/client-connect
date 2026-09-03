const API_BASE_URL = "http://192.168.122.200:8000/api";

export async function getCompanies() {
  const response = await fetch(`${API_BASE_URL}/companies`);

  if (!response.ok) {
    throw new Error("Failed to fetch companies");
  }

  return response.json();
}

export async function getCompanyTypes() {
  const response = await fetch(`${API_BASE_URL}/company-types`);

  if (!response.ok) {
    throw new Error("Failed to fetch company types");
  }

  return response.json();
}

export async function getApplicationServices() {
  const response = await fetch(`${API_BASE_URL}/application-services`);

  if (!response.ok) {
    throw new Error("Failed to fetch application services");
  }

  return response.json();
}
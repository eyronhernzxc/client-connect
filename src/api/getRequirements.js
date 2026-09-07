
import { api } from "./api";

export const getRequirements = async (companyTypeId) => {
  const response = await api.get("/requirements", {
    params: {
      company_type_id: companyTypeId,
    },
  });

  return response.data;
};


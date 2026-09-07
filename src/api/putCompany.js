import { api } from "./api.js";

export const putCompany = async (id, data) => {
  const response = await api.patch(`/companies/${id}`, data);
  return response.data;
};
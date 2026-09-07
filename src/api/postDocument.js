import { apiImage } from "./api-image.js";

export const postDocument = async (formData) => {
  const response = await apiImage.post(
    "/company-requirements",
    formData
  );

  return response.data;
};
import { api } from "./api";


const handleOpenRequirement = async (requirement) => {
  try {
    const response = await api.get(
      `/pdf/generate/${requirement.id}`,
      {
        responseType: "blob",
      }
    );

    const pdfUrl = URL.createObjectURL(response.data);

    window.open(pdfUrl, "_blank");

    URL.revokeObjectURL(pdfUrl);
  } catch (error) {
    console.error("Failed to open PDF:", error);
  }
};
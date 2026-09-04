import {apiImage} from "./api-image";

export const postDeclaration = async (data) => {

    const response = await apiImage.post("/declarations", data);

    return response.data;
}
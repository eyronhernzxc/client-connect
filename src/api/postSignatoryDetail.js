import {apiImage} from "./api-image.js";

export const postPersonalDetails = async (data) => {

    const response = await apiImage.post("/personal-details", data);

    return response.data;
}
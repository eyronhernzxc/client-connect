import {api} from "./api.js";

export const postPersonalDetails = async (data) => {

    const response = await api.post("/personal-details", data);

    return response.data;
}
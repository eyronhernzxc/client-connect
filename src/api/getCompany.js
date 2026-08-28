import {api} from "./api.js";

export const getCompany = async () => {

    const response = await api.get("/companies");

    return response.data.data;
}
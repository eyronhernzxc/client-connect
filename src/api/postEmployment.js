import {api} from "./api.js";

export const postEmployment = async (data) => {

    const response = await api.post("employment-informations", data);

    return response.data;
}
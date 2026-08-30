import {api} from "./api.js"

export const postCompany = async (data) => {

    const response = await api.post("/companies", data);

    return response.data;
}

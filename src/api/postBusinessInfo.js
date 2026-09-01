import {api} from "./api.js";

export const postBusinessInfo = async (data) =>{

    const response = await api.post("/business-information", data);

    return response.data;
}

export const postBusinessQuestion = async (data) => {

    const response = await api.post("/business-questions", data);

    return response.data;
}
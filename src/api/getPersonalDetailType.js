import {api} from "./api.js";

export const getPersonalDetailType = async () => {

    const reponse = await api.get ("/personal-detail-types");

    return response.data.data;
}
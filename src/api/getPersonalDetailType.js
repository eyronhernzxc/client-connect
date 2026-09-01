import {api} from "./api.js";

export const getPersonalDetailType = async () => {

    const response = await api.get ("/personal-detail-types");

    return response.data.data;
}
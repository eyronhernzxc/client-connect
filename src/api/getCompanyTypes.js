import {api} from "./api.js";

export const getCompanyTypes = async () => {

    const response = await api.get ("/company-types");

    return response.data.data;
}
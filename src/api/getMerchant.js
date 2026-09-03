import {api} from "./api.js";

export const getMerchant = async () => {

    const response = await api.get ("/user-details/role_id/3");

    return response.data.data;
}
import {api} from "./api.js";

export const getServices = async () => {

    const response = await api.get ("/application-services");

    return response.data.data;
}
import {api} from './api.js'

export const createUser = async (data) => {

    const response = await api.post("/register", data);

    return response.data;
};
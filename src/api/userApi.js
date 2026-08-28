import {api} from './api.js'

export const createUser = async (data) => {

    const response = await api.post("/register", data);
    console.log('API URL:', import.meta.env.VITE_API_URL);

    return response.data;
};
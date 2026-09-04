import {api} from './api.js';

export const postFinancial = async (data) => {

    const response = await api.post("/financial-informations", data);

    return ponse.data;
}
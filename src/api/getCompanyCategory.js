import {api} from './api';

export const getBankCategory = async () => {

    const response = await api.get ("/bank-categories");

    return response.data.data;
}
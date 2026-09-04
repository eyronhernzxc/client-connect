import {api} from './api';

export const getIdTypes = async () => {

    const response = await api.get('/valid-id-types');

    return response.data.data;
}
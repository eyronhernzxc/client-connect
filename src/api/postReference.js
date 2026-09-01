import {api} from './api.js';

export const postReference = async (mother, spouse) => {
    try {
        const motherResponse = await api.post(
            "/references",
            mother
        );  

        const spouseResponse = await api.post(
            "/references",
            spouse
        );

        return{

            mother: motherResponse.data,
            spouse: spouseResponse.data

        }

    }
    catch(error) {

        console.error("Failed to submit reference");
        throw error;
    }

}
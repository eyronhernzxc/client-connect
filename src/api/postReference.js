import {api} from './api.js';

export const postReference = async (mother, spouse) => {
    try {
        const motherResponse = await api.post(
            "/reference",
            mother
        );  

        const spouseResponse = await api.post(
            "/reference",
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
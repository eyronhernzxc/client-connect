import {api} from "./api";

export const postDeclaration = async (data) => {

    const response = await api.post("/declarations", data);

    return response.data;
}
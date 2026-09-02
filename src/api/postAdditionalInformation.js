import {api} from "./api.js"

export const postBank = async (bank) => {

    const response = await api.post("/banks", bank);

    return response.data;
}

export const postOrganization = async (organization) =>{

    const response = await api.post("/organization-relationships", organization);

    return response.data;
}

export const postFatca = async (fatca) =>{

    const response = await api.post("/fatca-information", fatca);

    return response.data;
}

export const postCustomerSupport = async (customerSupport) => {

    const response = await api.post("customer-support-details", customerSupport);

    return response.data;
}

export const postRelatedCompanies = async (relatedCompanyList) => {
    const response = await api.post("/related-company", relatedCompanyList);

    return response.data;  
}
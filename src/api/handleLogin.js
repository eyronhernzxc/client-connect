import {api} from './api';

export const handleLogin = async (email, password) => {

    const response = await api.post("/auth/me", {email, password});
    const { access_token } = response.data;

    localStorage.setItem("access_token", access_token);
    api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
};
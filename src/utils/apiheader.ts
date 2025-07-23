import axios from 'axios';

export const headerWithToken = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api/v1`,
});

headerWithToken.interceptors.request.use((config) => {
    config.headers['x-auth-token'] = localStorage.getItem('token');
    config.headers['ngrok-skip-browser-warning'] = true;
    return config;
});

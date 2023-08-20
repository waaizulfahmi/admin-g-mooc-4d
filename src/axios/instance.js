import axios from 'axios';

export const apiInstance = axios.create({
    baseURL: 'https://nurz.site/api',
    withCredentials: true,
});

export const sanctumApiInstance = axios.create({
    baseURL: 'https://nurz.site/sanctum/csrf-cookie',
    withCredentials: true,
});

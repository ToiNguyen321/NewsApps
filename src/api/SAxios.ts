import axios, { AxiosError } from 'axios';

export const BASE_URL = 'https://vnexpress.net';

const SAxios = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: {
        'Content-type': 'application/json'
    }
});

SAxios.interceptors.request.use(
    async function (config) {
        config.baseURL = BASE_URL
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

SAxios.interceptors.response.use((response) => {
    console.log(response)
    return response;
}, (error) => {
});

export const is401Error = (error: AxiosError) => {
    return error && error.response && error.response.status && error.response.status === 401;
}

export default SAxios;

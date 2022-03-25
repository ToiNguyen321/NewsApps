import { AxiosError, AxiosPromise } from 'axios';
import SAxios from "./SAxios"
import Urls from "./Urls"


const processResponse = (promise: AxiosPromise) => {
    return promise.then(response => ({ error: null, data: response?.data })).catch((error: AxiosError) => ({ error, data: error?.response?.data }))
}


export const getNews = () => {
    return processResponse(SAxios.get(`${Urls.URL_NEWS}}`));
}
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { constants } from '@/configs/constants';

const axiosClient = axios.create({
  baseURL: constants.apiUrl,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const onRequest = async (
  config: AxiosRequestConfig,
): Promise<AxiosRequestConfig> => {
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  // if (error.code === '401') {
  // }

  return Promise.reject(error);
};

axiosClient.interceptors.request.use(onRequest, onRequestError);
axiosClient.interceptors.response.use(onResponse, onResponseError);

export default axiosClient;

import { Store } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { hideSpinner, showSpinner } from '../../store/reducers/spinner.reducer';
import { config as appConfig } from '../../config';
import { removeEmptyProps } from '../../utils';

export const http = axios.create({
  baseURL: appConfig.nyTimesBaseURL,
  timeout: 1000000,
});

export async function get<T>(uri: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  if (!config) config = {};
  const params = removeEmptyProps(config.params);
  config.params = {
    'api-key': appConfig.nyTimesApiKey,
    ...params,
  };

  return http.get<T>(uri, config);
}

export function setupInterceptors(store: Store) {
  http.interceptors.request.use(
    async function (config) {
      store.dispatch(showSpinner());
      // Do something before request is sent
      return config;
    },
    function (error) {
      store.dispatch(hideSpinner());
      // Do something with request error
      return Promise.reject(error);
    },
  );

  http.interceptors.response.use(
    function (response) {
      store.dispatch(hideSpinner());
      // Any status code that lie within the range of 2xx cause this function to trigger
      return response;
    },
    async function (error) {
      store.dispatch(hideSpinner());
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      return Promise.reject(error);
    },
  );
}

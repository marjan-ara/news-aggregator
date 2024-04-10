import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { config as appConfig } from 'src/config';
import { removeEmptyProps } from 'src/utils';

export const http = axios.create({
  baseURL: appConfig.newsapiBaseURL,
  timeout: 1000000,
});

export async function get<T>(uri: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  if (!config) config = {};
  const params = removeEmptyProps(config.params);
  config.params = {
    apiKey: appConfig.newsApiKey,
    ...params,
  };

  return http.get<T>(uri, config);
}

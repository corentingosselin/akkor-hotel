import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export class HttpClient {
  constructor(private readonly config: AxiosRequestConfig) {}

  async sendRequest(
    method: HttpMethod,
    url: string,
    data?: any
  ): Promise<AxiosResponse> {
    const response = await axios.request({
      ...this.config,
      method: HttpMethod[method],
      url: url,
      data: data,
    });

    return response;
  }
}

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}
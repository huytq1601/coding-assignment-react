import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export interface ApiResponse<T> {
  data: T | null;
  error?: string;
}

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-cache",
  },
});

export class BaseService {
  protected async request<T>(
    config: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await api.request<T>(config);
      return { data: response.data };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  }
}

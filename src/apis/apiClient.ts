import { ApiErrorResponse, ApiResponse } from './response.types';

const fetcher = async <DataType>(url: string, method: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    method,
    ...options,
  });

  if (!response.ok) {
    const errResponse: ApiErrorResponse = await response.json();

    throw errResponse;
  }

  const { data }: ApiResponse<DataType> = await response.json();

  return data;
};

export const apiClient = {
  get: <DataType>(url: string, options: RequestInit = {}) => fetcher<DataType>(url, 'GET', options),
  post: <DataType>(url: string, options: RequestInit = {}) => fetcher<DataType>(url, 'POST', options),
  delete: <DataType>(url: string, options: RequestInit = {}) => fetcher<DataType>(url, 'DELETE', options),
  put: <DataType>(url: string, options: RequestInit = {}) => fetcher<DataType>(url, 'PUT', options),
  patch: <DataType>(url: string, options: RequestInit = {}) => fetcher<DataType>(url, 'PATCH', options),
};

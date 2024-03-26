export interface ApiResponse<T> {
  status: 'success';
  code: number;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  status: string;
  code: number;
  message: string;
  data: null;
}

export interface PageNationData {
  pageNumber: number;
  lastPage: number;
  pageSize: number;
}

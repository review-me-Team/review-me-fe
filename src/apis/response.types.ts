export interface ApiResponse<T> {
  status: 'success' | 'fail';
  code: number;
  message: string;
  data: T;
}

export interface PageNationData {
  pageNumber: number;
  lastPage: number;
  pageSize: number;
}

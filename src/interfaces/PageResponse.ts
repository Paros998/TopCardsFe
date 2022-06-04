export interface PageResponse<T> {
  currentPage: number;
  totalPages: number;
  content: T[];
}
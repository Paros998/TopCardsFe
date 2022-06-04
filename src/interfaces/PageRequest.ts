
export interface PageRequest {
  page: number;
  pageLimit: number;
  sortDir: "asc" | "desc";
  sortBy: string;
}
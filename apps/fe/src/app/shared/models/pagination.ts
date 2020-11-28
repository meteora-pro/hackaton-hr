export interface NestPagination {
  count?: number;
  page?: number;
  pageCount?: number;
  total?: number;
}

export interface NestPaginationResponse<T> extends NestPagination {
  data: T[];
}

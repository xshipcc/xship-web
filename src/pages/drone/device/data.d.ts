export interface BrandListItem {
  id: number;
  name: string;
}

export interface BrandListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface BrandListData {
  list: BrandListItem[];
  pagination: Partial<BrandListPagination>;
}

export interface BrandListParams {
  factoryStatus?: number;
  showStatus?: number;
  pageSize?: number;
  current?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
}

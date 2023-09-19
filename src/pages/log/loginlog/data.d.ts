/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-18 22:37:17
 * @FilePath: \zero-admin-ui-master\src\pages\log\loginlog\data.d.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
export interface TableListItem {
  id: number;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  pageSize?: number;
  current?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
}

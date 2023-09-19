/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 15:20:21
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-18 22:39:31
 * @FilePath: \zero-admin-ui-master\src\pages\AIalert\data.d.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
export interface DictListItem {
  id: number;
}

export interface DictListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface DictListData {
  list: DictListItem[];
  pagination: Partial<DictListPagination>;
}

export interface DictListParams {
  delFlag?: number;
  pageSize?: number;
  current?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
}

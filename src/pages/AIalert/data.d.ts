/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 15:20:21
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-27 15:34:59
 * @FilePath: \zero-admin-ui-master\src\pages\AIalert\data.d.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
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
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
/**
 *  @file data.d.ts
 *  @time 2023/09/27
 * @category :
 * @function :
 */
//#region -------------------------------------------------------------------------

interface ListAlertHistoryReq {
  current: number;
  pageSize: number;
  type: number;
  starttime: string;
  endtime: string;
  platform: number;
  confirm: number;
}

interface ListtAlertHistoryData {
  id: number;
  name: string;
  image: string;
  type: number;
  code: string;
  level: number;
  count: number;
  platform: number;
  starttime: string;
  endtime: string;
  note: string;
  confirm: number;
}

interface ListAlertHistoryRespType {
  current: number;
  data: ListtAlertHistoryData[];
  pageSize: number;
  success: boolean;
  total: number;
  code: string;
  message: string;
}

interface UpdateAlertHistoryReqType {
  id: number;
}

interface UpdateAlertHistoryRespType {
  code: string;
  message: string;
}

//#endregion -----------------------------------------------------------------------
/**
 * @end
 */

/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-27 15:18:31
 * @FilePath: \zero-admin-ui-master\src\pages\drone\routePlan\data.d.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
export interface FlashPromotionListItem {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
}

export interface FlashPromotionListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface FlashPromotionListData {
  list: FlashPromotionListItem[];
  pagination: Partial<FlashPromotionListPagination>;
}

export interface FlashPromotionListParams {
  title?: string;
  status?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
}
/**
 *  @file data.d.ts
 *  @time 2023/09/27
 * @category :
 * @function :
 */
//#region -------------------------------------------------------------------------

interface AddUavFlyReqType {
  name: string;
  data: string;
  createTime: string;
  creator: string;
}

interface AddUavFlyRespType {
  code: string;
  message: string;
}

interface ListUavFlyReqType {
  current?: number;
  pageSize?: number;
  uavId?: number;
}

interface ListtUavFlyDataType {
  id: number;
  name: string;
  data: string;
  createTime: string;
  creator: string;
}

interface ListUavFlyRespType {
  current: number;
  data: ListtUavFlyDataType[];
  pageSize: number;
  success: boolean;
  total: number;
  code: string;
  message: string;
}

interface UpdateUavFlyReqType {
  id: number;
  uavId: number;
  name: string;
  phoneNumber: string;
  defaultStatus: number;
  postCode: string;
  province: string;
  city: string;
  region: string;
  detailAddress: string;
}

interface UpdateUavFlyRespType {
  code: string;
  message: string;
}

interface DeleteUavFlyReqType {
  ids: number[];
}

interface DeleteUavFlyRespType {
  code: string;
  message: string;
}

//#endregion -----------------------------------------------------------------------
/**
 * @end
 */

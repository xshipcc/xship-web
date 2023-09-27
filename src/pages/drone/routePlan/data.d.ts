/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-27 12:04:08
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

interface AddUavFlyReqType {
  Name: string;
  Data: string;
  CreateTime: string;
  Creator: string;
}

interface AddUavFlyRespType {
  Code: string;
  Message: string;
}

interface ListUavFlyReqType {
  Current?: number;
  PageSize?: number;
  UavId?: number;
}

interface ListtUavFlyDataType {
  Id: number;
  Name: string;
  Data: string;
  CreateTime: string;
  Creator: string;
}

interface ListUavFlyRespType {
  Current: number;
  Data: ListtUavFlyDataType[];
  PageSize: number;
  Success: boolean;
  Total: number;
  Code: string;
  Message: string;
}

interface UpdateUavFlyReqType {
  Id: number;
  UavId: number;
  Name: string;
  PhoneNumber: string;
  DefaultStatus: number;
  PostCode: string;
  Province: string;
  City: string;
  Region: string;
  DetailAddress: string;
}

interface UpdateUavFlyRespType {
  Code: string;
  Message: string;
}

interface DeleteUavFlyReqType {
  Ids: number[];
}

interface DeleteUavFlyRespType {
  Code: string;
  Message: string;
}

//#endregion -----------------------------------------------------------------------
/**
 * @end
 */

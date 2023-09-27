/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-24 22:27:17
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-27 12:01:13
 * @FilePath: \zero-admin-ui-master\src\pages\drone\history\data.d.ts
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

interface AddUavHistoryReqType {
  uav_id: number; // 无人机id
  fly_id: number; // 巡检路线id
  operator: string; // 操作者
  create_time: string; // 创建时间
  end_time: string; // 结束时间
}

interface AddUavHistoryRespType {
  code: string;
  message: string;
}

interface ListUavHistoryReqType {
  current?: number;
  pageSize?: number;
  create_time?: string; // 创建时间
  end_time?: string; // 结束时间
  operator?: string; // 操作者
  uav_id?: number; // 无人机id
  fly_id?: number; // 巡检路线id
}

interface ListUavHistoryDataType {
  id: number;
  uav_id: number; // 无人机id
  fly_id: number; // 巡检路线id
  operator: string; // 操作者
  create_time: string; // 创建时间
  end_time: string; // 结束时间
}

interface ListUavHistoryRespType {
  current: number;
  data: ListUavHistoryDataType[];
  pageSize: number;
  success: boolean;
  total: number;
  code: string;
  message: string;
}

//#endregion -----------------------------------------------------------------------
/**
 * @end
 */

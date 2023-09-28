/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-08 10:25:32
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-28 14:15:07
 * @FilePath: \zero-admin-ui-master\src\pages\drone\task\data.d.ts
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
// 添加
interface AddUavPlanReqType {
  uad_id: number; // 无人机ID
  uad_icon: number; // 无人机 icon
  plan: string[] | undefined; // 飞行计划时间
  fly_id: number; // 巡检路线id
}

interface AddUavPlanRespType {
  code: string;
  message: string;
}
// 请求
interface ListUavPlanReqType {
  current?: number;
  pageSize?: number;
}
interface ListUavPlanDataType {
  id: number;
  uad_id: number; // 无人机ID
  uad_icon: number; // 无人机 icon
  plan: string[] | undefined; // 飞行计划时间
  fly_id: number; // 巡检路线id
}
interface ListUavPlanRespType {
  code: string;
  message: string;
  current: number;
  data: ListUavPlanDataType[];
  pageSize: number;
  success: boolean;
  total: number;
}
// 更新
interface UpdateUavPlanReqType {
  id: number;
  uad_id: number; // 无人机ID
  uad_icon: number; // 无人机 icon
  plan: string[] | undefined; // 飞行计划时间
  fly_id: number; // 巡检路线id
}

interface UpdateUavPlanRespType {
  code: string;
  message: string;
}
// 删除
interface DeleteUavPlanReqType {
  ids: number[];
}

interface DeleteUavPlanRespType {
  code: string;
  message: string;
}

//#endregion -----------------------------------------------------------------------
/**
 * @end
 */

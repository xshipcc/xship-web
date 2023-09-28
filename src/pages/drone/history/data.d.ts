/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-24 22:27:17
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-28 11:14:16
 * @FilePath: \zero-admin-ui-master\src\pages\drone\history\data.d.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */

/**
 *  @file data.d.ts
 *  @time 2023/09/27
 * @category :
 * @function :
 */
//#region -------------------------------------------------------------------------

export interface AddUavHistoryReqType {
  uavId: number; // 无人机id
  flyId: number; // 巡检路线id
  operator: string; // 操作者
  createTime: string; // 创建时间
  endTime: string; // 结束时间
}

export interface AddUavHistoryRespType {
  code: string;
  message: string;
}

export interface ListUavHistoryReqType {
  current?: number;
  pageSize?: number;
  operator?: string; // 操作者
  createTime?: string; // 创建时间
  endTime?: string; // 结束时间
  uavId?: number; // 无人机id
  flyId?: number; // 巡检路线id
}

export interface ListUavHistoryDataType {
  id: number;
  uavId: number; // 无人机id
  flyId: number; // 巡检路线id
  operator: string; // 操作者
  createTime: string; // 创建时间
  endTime: string; // 结束时间
}

export interface ListUavHistoryRespType {
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

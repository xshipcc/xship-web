/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-24 22:27:17
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-11-23 07:31:14
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
  uav_id: number; // 无人机id
  fly_id: number; // 巡检路线id
  operator: string; // 操作者
  create_time: string; // 创建时间
  end_time: string; // 结束时间
}

export interface AddUavHistoryRespType {
  code: string;
  message: string;
}

export interface ListUavHistoryReqType {
  current?: number;
  pageSize?: number;
  operator?: string; // 操作者
  create_time?: string; // 创建时间
  end_time?: string; // 结束时间
  uav_id?: number; // 无人机id
  fly_id?: number; // 巡检路线id
  history_id?: number; // 巡检路线id
}

export interface ListUavHistoryDataType {
  id: number;
  uav_id: number; // 无人机id
  fly_id: number; // 巡检路线id
  operator: string; // 操作者
  create_time: string; // 创建时间
  end_time: string; // 结束时间
  lon: number;
  lat: number;
  height: number;
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

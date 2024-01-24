/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-24 22:27:17
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-01-24 09:56:41
 * @FilePath: \zero-admin-ui-master\src\pages\report\data.d.ts
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
export interface ListAlertHistoryReq {
  current?: number;
  pageSize?: number;
  type: number;
  start_time: string;
  end_time: string;
  platform: number;
  confirm: number;
  history_id: number;
}

export interface ListAlertHistoryData {
  id: number;
  name: string;
  image: string;
  type: number;
  code: string;
  level: number;
  count: number;
  platform: number;
  start_time: string;
  end_time: string;
  note: string;
  lat: number;
  lon: number;
  alt: number;
  confirm: number;
}

export interface ListAlertHistoryRespType {
  current: number;
  data: ListAlertHistoryData[];
  pageSize: number;
  success: boolean;
  total: number;
  code: string;
  message: string;
}

export interface SnapshotData {
  id: number;
  total: number;
  person: number;
  car: number;
  bicycle: number;
  bus: number;
  truck: number;
  box_truck: number;
  tricycle: number;
  motorcycle: number;
  smoke: number;
  fire: number;
  remark: string;
  snapshots: SnapshotImages;
  create_time: string;
}

export interface SnapshotImages {
  bicycle: string[];
  boxtruck: string[];
  bus: string[];
  car: string[];
  fire: string[];
  motorcycle: string[];
  person: string[];
  smoke: string[];
  tricycle: string[];
  truck: string[];
}

//#endregion -----------------------------------------------------------------------
/**
 * @end
 */

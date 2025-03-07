/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 15:20:21
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-01-05 19:16:50
 * @FilePath: \zero-admin-ui-master\src\pages\AIalert\data.d.ts
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
//  type     '消息类型:0-发现人员 1-車輛 2-入侵 3-烟火 4-',
// platform '使用平台：0-全部 1-飞机 2-摄像头;3-机库;4-AI',
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

export interface UpdateAlertHistoryReqType {
  id: number;
  confirm: number;
}

export interface UpdateAlertHistoryRespType {
  code: string;
  message: string;
}

//#endregion -----------------------------------------------------------------------
/**
 * @end
 */

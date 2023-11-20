/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-11-20 12:03:52
 * @FilePath: \zero-admin-ui-master\src\pages\drone\device\data.d.ts
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
// 查询
export interface ListUavDeviceReqType {
  current?: number;
  pageSize?: number;
}

export interface ListUavDeviceData {
  id: number; // 无人机id
  name: string; // 无人机名称
  ip: string; // 无人机IP
  port: number; // 无人机port
  r_port: number; // 无人机接收端口port
  hangar_ip: string; // 无人机机库IP
  hangar_port: number; // 无人机机库port
  hangar_rport: number; // 无人机机库接收port
  cam_ip: string; // 摄像头IP
  cam_port: number; // 摄像头port
  cam_url: string; // 摄像头rtsp 地址
  create_time: string; // 创建时间
}

export interface ListUavDeviceRespType {
  code: string;
  message: string;
  current: number;
  data: ListUavDeviceData[];
  pageSize: number;
  success: boolean;
  total: number;
}
// 添加
export interface AddUavDeviceReqType {
  name: string; // 无人机名称
  ip: string; // 无人机IP
  port: number; // 无人机port
  r_port: number; // 无人机接收端口port
  hangar_ip: string; // 无人机机库IP
  hangar_port: number; // 无人机机库port
  hangar_rport: number; // 无人机机库接收port
  cam_ip: string; // 摄像头IP
  cam_port: number; // 摄像头port
  cam_url: string; // 摄像头rtsp 地址
  create_time: string; // 创建时间
}

export interface AddUavDeviceRespType {
  code: string;
  message: string;
}

// 更新
export interface UpdateUavDeviceReqType {
  name: string; // 无人机名称
  ip: string; // 无人机IP
  port: number; // 无人机port
  r_port: number; // 无人机接收端口port
  hangar_ip: string; // 无人机机库IP
  hangar_port: number; // 无人机机库port
  hangar_rport: number; // 无人机机库接收port
  cam_ip: string; // 摄像头IP
  cam_port: number; // 摄像头port
  cam_url: string; // 摄像头rtsp 地址
  create_time: string; // 创建时间
}

export interface UpdateUavDeviceRespType {
  code: string;
  message: string;
}

export interface DeleteUavDeviceReqType {
  ids: number[];
}

export interface DeleteUavDeviceRespType {
  code: string;
  message: string;
}

//#endregion -----------------------------------------------------------------------
/**
 * @end
 */

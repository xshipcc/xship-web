/**
 *  @file data.d.ts
 *  @time 2023/11/16
 * @category :面板显示信息
 * @function :
 */
//#region -------------------------------------------------------------------------

export interface DroneData {
  lat: number;
  lon: number;
  height: number;
  pitch: number;
  trajectory: number;
  roll_angle: number;
  rel_height: number;
  target_height: number;
  fly_time: number;
  fly_distance: number;
  speed: number;
  gps_speed: number;
}

export interface HangarData {
  battery_v: number;
  battery_temp: number;
  warehouse_status: number;
  battery_status: number;
  homing_status: number;
  uavpower_status: number;
}

export interface MonitorData {
  lat: number;
  lon: number;
  target_height: number;
  tf_usage: number;
  tf_total: number;
}

export interface DashboardinfoType {
  monitor: MonitorData;
  hangar: HangarData;
  drone: DroneData;
}

export type Drone = {
  check: string;
  unlock: string;
  takeoff: string;
  return: string;
  lock: string;
  mode: string;
  light: string;
};

export type Monitor = {
  video: string;
  positioning: string;
};

export type Hangar = {
  hatch: string;
  charging: string;
  mechanism: string;
};

export type Player = {
  play: string;
  pause: string;
  speed: '1' | '2' | '4' | '6';
};

export type dashboardStateType = {
  drone: Drone;
  monitor: Monitor;
  hangar: Hangar;
  player: Player;
};

//#endregion -----------------------------------------------------------------------
/**
 * @end
 */

export interface AddUavDeviceRespType {
  code: string;
  message: string;
}

// 更新
export interface UpdateUavDeviceReqType {
  id: number;
  name: string;
  ip: string;
  port: number;
  hangar_ip: string;
  hangar_port: number;
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

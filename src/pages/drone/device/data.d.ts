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
  id: number;
  name: string;
  ip: string;
  port: number;
  hangarIp: string;
  hangarPort: number;
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
  name: string;
  ip: string;
  port: number;
  hangarIp: string;
  hangarPort: number;
}

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
  hangarIp: string;
  hangarPort: number;
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

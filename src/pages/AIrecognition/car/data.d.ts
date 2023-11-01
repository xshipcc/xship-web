/**
 *  @file data.d.ts
 *  @time 2023/10/31
 * @category :
 * @function :
 */
//#region -------------------------------------------------------------------------

export interface AddCarReq {
  name: string;
  card: string;
  photo: string;
  type: number;
  phone: string;
  agency: string;
  status: number;
}

export interface AddCarResp {
  code: string;
  message: string;
}

export interface ListCarReq {
  current?: number;
  pageSize?: number;
}

export interface ListCarData {
  id: number;
  name: string;
  card: string;
  photo: string;
  type: number;
  phone: string;
  agency: string;
  status: number;
}

export interface ListCarResp {
  code: string;
  message: string;
  current: number;
  data: ListCarData[];
  pageSize: number;
  success: boolean;
  total: number;
}

export interface UpdateCarReq {
  id: number;
  name: string;
  card: string;
  photo: string;
  type: number;
  phone: string;
  agency: string;
  status: number;
}

export interface UpdateCarResp {
  code: string;
  message: string;
}

export interface DeleteCarReq {
  ids: number[];
}

export interface DeleteCarResp {
  code: string;
  message: string;
}

//#endregion -----------------------------------------------------------------------
/**
 * @end
 */

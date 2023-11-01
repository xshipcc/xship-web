/**
 *  @file data.d.ts
 *  @time 2023/10/31
 * @category :
 * @function :
 */
//#region -------------------------------------------------------------------------

export interface AddPeopleReq {
  level: number;
  username: string;
  phone: string;
  status: number;
  icon: string;
  gender: number;
  create_time: string;
}

export interface AddPeopleResp {
  code: string;
  message: string;
}

export interface ListPeopleReq {
  current?: number;
  pageSize?: number;
  username?: string;
  phone?: string;
  status?: number;
}

export interface ListPeopleData {
  id: number;
  level: number;
  username: string;
  phone: string;
  status: number;
  icon: string;
  gender: number;
  create_time: string;
}

export interface ListPeopleResp {
  code: string;
  message: string;
  current: number;
  data: ListPeopleData[];
  pageSize: number;
  success: boolean;
  total: number;
}

export interface UpdatePeopleReq {
  id: number;
  level: number;
  username: string;
  phone: string;
  status: number;
  icon: string;
  gender: number;
  create_time: string;
}

export interface UpdatePeopleResp {
  code: string;
  message: string;
}

export interface DeletePeopleReq {
  ids: number[];
}

export interface DeletePeopleResp {
  code: string;
  message: string;
}

//#endregion -----------------------------------------------------------------------
/**
 * @end
 */

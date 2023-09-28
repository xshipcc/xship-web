/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-28 15:04:21
 * @FilePath: \zero-admin-ui-master\src\pages\drone\routePlan\data.d.ts
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

export interface AddUavFlyReqType {
  name: string;
  data: string;
  create_time: string;
  creator: string;
}

export interface AddUavFlyRespType {
  code: string;
  message: string;
}

export interface ListUavFlyReqType {
  current?: number;
  pageSize?: number;
  uad_id?: number;
}

export interface ListtUavFlyDataType {
  id: number;
  name: string;
  data: string;
  create_time: string;
  creator: string;
}

export interface ListUavFlyRespType {
  current: number;
  data: ListtUavFlyDataType[];
  pageSize: number;
  success: boolean;
  total: number;
  code: string;
  message: string;
}

export interface UpdateUavFlyReqType {
  id: number;
  name: string;
  data: string;
  create_time: string;
  creator: string;
}

export interface UpdateUavFlyRespType {
  code: string;
  message: string;
}

export interface DeleteUavFlyReqType {
  ids: number[];
}

export interface DeleteUavFlyRespType {
  code: string;
  message: string;
}

//#endregion -----------------------------------------------------------------------
/**
 * @end
 */

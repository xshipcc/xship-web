/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-28 14:57:45
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-28 15:00:56
 * @FilePath: \zero-admin-ui-master\src\pages\drone\network\data.d.ts
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
export interface AddUavNetworkReqType {
  name: string; // 频段名称
  band: number; // 频段号
  type: number; // 频段类型
}

export interface AddUavNetworkRespType {
  code: string;
  message: string;
}

export interface ListUavNetworkReqType {
  current?: number;
  pageSize?: number;
}

export interface ListUavNetworkDataType {
  id: number;
  name: string; // 频段名称
  band: number; // 频段号
  type: number; // 频段类型
}

export interface ListUavNetworkRespType {
  code: string;
  message: string;
  current: number;
  data: ListtUavNetworkData[];
  pageSize: number;
  success: boolean;
  total: number;
}

export interface UpdateUavNetworkReqType {
  id: number;
  name: string; // 频段名称
  band: number; // 频段号
  type: number; // 频段类型
}

export interface UpdateUavNetworkRespType {
  code: string;
  message: string;
}

export interface DeleteUavNetworkReqType {
  ids: number[];
}

export interface DeleteUavNetworkRespType {
  code: string;
  message: string;
}

//#endregion -----------------------------------------------------------------------
/**
 * @end
 */

/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-28 08:54:43
 * @FilePath: \zero-admin-ui-master\src\pages\drone\Network\service.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { request } from 'umi';
import type {
  ListUavNetworkReqType,
  UpdateUavNetworkReqType,
  AddUavNetworkReqType,
} from './data.d';

/**
 *  @file service.ts
 *  @time 2023/09/27
 * @category :
 * @function :
 */
//#region -------------------------------------------------------------------------

export async function queryNetwork(params: ListUavNetworkReqType) {
  return request('/api/uav/network/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateNetwork(params: UpdateUavNetworkReqType) {
  return request('/api/uav/network/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function addNetwork(params: AddUavNetworkReqType) {
  console.log('addNetwork -> params:', params);
  return request('/api/uav/network/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function removeNetwork(params: { ids: number[] }) {
  return request('/api/uav/network/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//#endregion -----------------------------------------------------------------------
/**
 * @end
 */

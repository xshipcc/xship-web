/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-28 15:08:36
 * @FilePath: \zero-admin-ui-master\src\pages\drone\routePlan\service.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { request } from 'umi';
import type { ListUavFlyReqType, AddUavFlyReqType, UpdateUavFlyReqType } from './data.d';

/**
 *  @file service.ts
 *  @time 2023/09/27
 * @category :
 * @function :
 */
//#region -------------------------------------------------------------------------

export async function queryFly(params: ListUavFlyReqType) {
  return request('/api/uav/fly/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeFly(params: { ids: number[] }) {
  return request('/api/uav/fly/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addFly(params: AddUavFlyReqType) {
  return request('/api/uav/fly/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateFly(params: UpdateUavFlyReqType) {
  return request('/api/uav/fly/update', {
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

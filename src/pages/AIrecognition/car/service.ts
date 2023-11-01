/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-28 08:54:43
 * @FilePath: \zero-admin-ui-master\src\pages\drone\car\service.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { request } from 'umi';
import type { ListCarReq, UpdateCarReq, AddCarReq } from './data.d';

/**
 *  @file service.ts
 *  @time 2023/09/27
 * @category :
 * @function :
 */
//#region -------------------------------------------------------------------------

export async function queryCar(params: ListCarReq) {
  return request('/api/uav/car/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateCar(params: UpdateCarReq) {
  return request('/api/uav/car/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function addCar(params: AddCarReq) {
  console.log('addCar -> params:', params);
  return request('/api/uav/car/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function removeCar(params: { ids: number[] }) {
  return request('/api/uav/car/delete', {
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

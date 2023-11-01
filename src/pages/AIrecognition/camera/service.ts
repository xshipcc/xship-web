/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-11-01 10:37:41
 * @FilePath: \zero-admin-ui-master\src\pages\AIrecognition\camera\service.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { request } from 'umi';
import type { ListCamerasReq, UpdateCamerasReq, AddCamerasReq } from './data.d';

/**
 *  @file service.ts
 *  @time 2023/09/27
 * @category :
 * @function :
 */
//#region -------------------------------------------------------------------------

export async function queryCameras(params: ListCamerasReq) {
  return request('/api/uav/camera/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateCameras(params: UpdateCamerasReq) {
  return request('/api/uav/camera/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function addCameras(params: AddCamerasReq) {
  console.log('addCameras -> params:', params);
  return request('/api/uav/camera/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function removeCameras(params: { ids: number[] }) {
  return request('/api/uav/camera/delete', {
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

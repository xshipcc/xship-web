/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-28 08:54:43
 * @FilePath: \zero-admin-ui-master\src\pages\drone\device\service.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { request } from 'umi';
import type {
  FlashPromotionListParams,
  FlashPromotionListItem,
  ListUavDeviceReqType,
  ListUavDeviceData,
  UpdateUavDeviceReqType,
  AddUavDeviceReqType,
} from './data.d';

export async function queryFlashPromotion(params: FlashPromotionListParams) {
  if (params.status != null) {
    params.status = Number(params.status);
  }
  return request('/api/sms/flashpromotion/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addFlashPromotion(params: FlashPromotionListItem) {
  return request('/api/sms/flashpromotion/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateFlashPromotion(params: FlashPromotionListItem) {
  return request('/api/sms/flashpromotion/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeFlashPromotion(params: { ids: number[] }) {
  return request('/api/sms/flashpromotion/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 *  @file service.ts
 *  @time 2023/09/27
 * @category :
 * @function :
 */
//#region -------------------------------------------------------------------------

export async function queryDevice(params: ListUavDeviceReqType) {
  return request('/api/uav/device/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateDevice(params: UpdateUavDeviceReqType) {
  return request('/api/uav/device/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function addDevice(params: AddUavDeviceReqType) {
  console.log('addDevice -> params:', params);
  return request('/api/uav/device/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function removeDevice(params: { ids: number[] }) {
  return request('/api/uav/device/delete', {
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

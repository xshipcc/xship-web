/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-24 22:27:17
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-27 11:04:34
 * @FilePath: \zero-admin-ui-master\src\pages\drone\history\service.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { request } from 'umi';
import { FlashPromotionListParams, FlashPromotionListItem } from './data.d';

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

export async function removeFlashPromotion(params: { ids: number[] }) {
  return request('/api/sms/flashpromotion/delete', {
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

export async function removeHistory(params: { ids: number[] }) {
  return request('/api/sms/flashpromotion/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addHistory(params: FlashPromotionListItem) {
  return request('/api/sms/flashpromotion/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateHistory(params: FlashPromotionListItem) {
  return request('/api/sms/flashpromotion/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function queryHistory(params: FlashPromotionListParams) {
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

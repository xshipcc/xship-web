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
/**
 *  @file service.ts
 *  @time 2023/09/27
 * @category :
 * @function :
 */
//#region -------------------------------------------------------------------------

export async function queryFly(params: FlashPromotionListParams) {
  if (params.status != null) {
    params.status = Number(params.status);
  }
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

export async function addFly(params: FlashPromotionListItem) {
  return request('/api/uav/fly/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateFly(params: FlashPromotionListItem) {
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

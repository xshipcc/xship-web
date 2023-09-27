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
export async function queryDevice(params: FlashPromotionListParams) {
  console.log('queryDevice -> params:', params);
  if (params.status != null) {
    params.status = Number(params.status);
  }
  return request('/api/uav/task/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeDevice(params: { ids: number[] }) {
  return request('/api/uav/task/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateDevice(params: FlashPromotionListItem) {
  return request('/api/uav/task/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function addDevice(params: FlashPromotionListItem) {
  return request('/api/uav/task/add', {
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

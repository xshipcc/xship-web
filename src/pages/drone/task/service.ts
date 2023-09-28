import { request } from 'umi';
import {
  FlashPromotionListParams,
  FlashPromotionListItem,
  AddUavPlanReqType,
  UpdateUavPlanReqType,
  ListUavPlanReqType,
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

export async function queryPlan(params: ListUavPlanReqType) {
  return request('/api/uav/plan/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removePlan(params: { ids: number[] }) {
  return request('/api/uav/plan/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addPlan(params: AddUavPlanReqType) {
  return request('/api/uav/plan/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updatePlan(params: UpdateUavPlanReqType) {
  return request('/api/uav/plan/update', {
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

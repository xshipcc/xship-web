import { request } from 'umi';
import {
  BrandListParams,
  BrandListItem,
  UpdateAlertHistoryReqType,
  ListAlertHistoryReq,
} from './data.d';

export async function queryBrand(params: BrandListParams) {
  if (params.factoryStatus != null) {
    params.factoryStatus = Number(params.factoryStatus);
  }
  if (params.showStatus != null) {
    params.showStatus = Number(params.showStatus);
  }
  return request('/api/product/brand/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeBrand(params: { ids: number[] }) {
  return request('/api/product/brand/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addBrand(params: BrandListItem) {
  return request('/api/product/brand/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function updateBrand(params: BrandListItem) {
  return request('/api/product/brand/update', {
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

export async function queryAlert(params: ListAlertHistoryReq) {
  return request('/api/uav/alert/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function upadtaAlert(params: UpdateAlertHistoryReqType) {
  return request('/api/uav/alert/update', {
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

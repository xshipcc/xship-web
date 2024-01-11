import { request } from 'umi';
import {
  BrandListParams,
  BrandListItem,
  UpdateAlertHistoryReqType,
  ListAlertHistoryReq,
} from './data.d';

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

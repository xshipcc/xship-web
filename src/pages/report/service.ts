/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-24 22:27:17
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-28 11:36:32
 * @FilePath: \zero-admin-ui-master\src\pages\drone\history\service.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { request } from 'umi';
import type { ListUavHistoryReqType, AddUavHistoryReqType } from './data.d';

/**
 *  @file service.ts
 *  @time 2023/09/27
 * @category :
 * @function :
 */
//#region -------------------------------------------------------------------------

export async function addHistory(params: AddUavHistoryReqType) {
  console.log('addHistory -> params:', params);
  return request('/api/uav/history/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function queryHistory(params: ListUavHistoryReqType) {
  return request('/api/uav/history/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function queryAlert(params: ListAlertHistoryReq) {
  return request('/api/uav/alert/list', {
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

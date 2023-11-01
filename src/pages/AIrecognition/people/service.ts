/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-07 13:46:28
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-28 08:54:43
 * @FilePath: \zero-admin-ui-master\src\pages\drone\people\service.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { request } from 'umi';
import type { ListPeopleReq, UpdatePeopleReq, AddPeopleReq } from './data.d';

/**
 *  @file service.ts
 *  @time 2023/09/27
 * @category :
 * @function :
 */
//#region -------------------------------------------------------------------------

export async function queryPeople(params: ListPeopleReq) {
  return request('/api/uav/people/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updatePeople(params: UpdatePeopleReq) {
  return request('/api/uav/people/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function addPeople(params: AddPeopleReq) {
  console.log('addPeople -> params:', params);
  return request('/api/uav/people/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function removePeople(params: { ids: number[] }) {
  return request('/api/uav/people/delete', {
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

/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-24 22:25:18
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-02-01 08:13:07
 * @FilePath: \zero-admin-ui-master\src\pages\system\user\service.ts
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import { request } from 'umi';
import { UserListParams, UserListItem } from './data.d';

export async function queryUserList(params: UserListParams) {
  if (params.status != null) {
    params.status = Number(params.status);
  }
  return request('/api/sys/user/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function querySelectAllData(params?: UserListParams) {
  return request('/api/sys/user/selectAllData', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeUser(params: { ids: number[] }) {
  return request('/api/sys/user/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addUser(params: UserListItem) {
  return request('/api/sys/user/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateUser(params: UserListItem) {
  return request('/api/sys/user/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function updateUserPassword(params: UserListItem) {
  return request('/api/sys/user/reSetPassword', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-16 18:51:52
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-16 20:36:05
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\service.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
// API
import { request } from 'umi';

// 获取用户数据
export const getDashboardInfo = async ({ params }: { params: any }) => {
  return request('/api/dashboard' + params.component, {
    method: 'get',
    params,
  });
};

// 新增用户
// data: 单个用户所需的信息
export const addRecord = async ({ data }: { data: any }) => {
  return request(`/api/users`, {
    method: 'post',
    data,
  });
};

// 编辑用户
// id: 用户ID
// data: 单个用户所需的信息
export const editRecord = async ({ id, data }: { id: number; data: any }) => {
  return request(`/api/users/${id}`, {
    method: 'put',
    data,
  });
};

// 删除用户
// id: 用户ID
export const delRecord = async ({ id }: { id: number }) => {
  return request(`/api/users/${id}`, {
    method: 'delete',
  });
};

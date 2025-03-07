import { request } from 'umi';
import type { DeptListParams, DeptListItem } from './data.d';

export async function queryDept(params: DeptListParams) {
  return request('/api/sys/dept/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeDept(params: { ids: number[] }) {
  return request('/api/sys/dept/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addDept(params: DeptListItem) {
  if (params.parentIds) {
    params.parentId = params.parentIds.at(-1);
  }
  return request('/api/sys/dept/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateDept(params: DeptListItem) {
  if (params.parentIds) {
    params.parentId = params.parentIds.at(-1);
  }
  return request('/api/sys/dept/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

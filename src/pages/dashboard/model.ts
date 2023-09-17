/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-16 18:32:55
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-17 14:27:17
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\model.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import type { Effect, ImmerReducer, Subscription } from 'umi';
import { getDashboardInfo } from './service';
import type { DashboardInfoType } from './typings';
export interface DashboardState {
  dashboardInfo: DashboardInfoType;
  checkedCompanyId: string | undefined;
  enterpriseOptions: string[];
}
export interface CompanyModelType {
  namespace: 'dashboardModel';
  state: DashboardState;
  reducers: {
    // 启用 immer 之后
    saveCheckedCompanyID: ImmerReducer<string> | any;
    saveEnterpriseOptions: ImmerReducer<string> | any;
    saveDashboardInfo: ImmerReducer<string> | any;
  };
  effects: {
    fetchEnterpriseOptions: Effect;
    fetchDashboardInfo: Effect;
  };
}
const CompanyModel: CompanyModelType = {
  namespace: 'dashboardModel',
  state: {
    dashboardInfo: {
      drone: {
        total: 0,
        online: 0,
        breakdown: 0,
      },
      inspection: {
        total: 0,
        complete: 0,
        rate: 0,
        today: 0,
        breakdown: 0,
        warning: 0,
      },
      pie: [],
      line: [],
      DualAxes: [],
      alarmPie: [],
    },
    checkedCompanyId: undefined,
    enterpriseOptions: [],
  },
  reducers: {
    saveCheckedCompanyID(state: DashboardState, action: { payload: string }) {
      state.checkedCompanyId = action.payload;
    },
    saveEnterpriseOptions(state: DashboardState, action: { payload: string[] }) {
      state.enterpriseOptions = action.payload;
    },
    saveDashboardInfo(state: DashboardState, action: { payload: DashboardInfoType }) {
      console.log('saveDashboardInfo -> payload:', action.payload);
      state.dashboardInfo = action.payload;
    },
  },
  effects: {
    *fetchEnterpriseOptions({ payload }, { call, put }) {
      // @ts-ignore
      const response = yield call(getDashboardInfo, payload);
      const { code, result } = response;
      if (code === '10001') {
        yield put({ type: 'saveEnterpriseOptions', payload: result ?? [] });
      }
    },
    *fetchDashboardInfo({ payload }, { call, put }) {
      // @ts-ignore
      const response = yield call(getDashboardInfo, payload);
      console.log('*fetchDashboardInfo -> response:', response);
      const { code, result } = response;
      if (code === '000000') {
        yield put({ type: 'saveDashboardInfo', payload: result ?? [] });
      }
    },
  },
};

export default CompanyModel;

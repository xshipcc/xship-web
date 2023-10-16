/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-16 18:32:55
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-16 00:24:32
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\model.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import type { Effect, ImmerReducer } from 'umi';
import { getDashboardInfo } from './service';
import { getAlertList } from './service';
import type { DashboardInfoType, DroneDataType } from './typings';
import type { ListUavFlyDataType } from '@/pages/drone/routePlan/data';
import type { ListAlertHistoryData } from '@/pages/AIalert/data';
export interface DashboardState {
  currentComponent: string;
  dashboardInfo: DashboardInfoType;
  checkedCompanyId: string | undefined;
  enterpriseOptions: string[];
  alertList: string[];
  currentFlyData: ListUavFlyDataType;
  alertData: ListAlertHistoryData;
}
export interface DashboardModelType {
  namespace: 'dashboardModel';
  state: DashboardState;
  reducers: {
    changeCurrentComponent: ImmerReducer<string> | any;
    saveCheckedCompanyID: ImmerReducer<string> | any;
    saveEnterpriseOptions: ImmerReducer<string> | any;
    saveDashboardInfo: ImmerReducer<string> | any;
    saveAlertList: ImmerReducer<string> | any;
    saveCurrentFlyData: ImmerReducer<string> | any;
    saveAlertData: ImmerReducer<string> | any;
  };
  effects: {
    // fetchEnterpriseOptions: Effect;
    fetchDashboardInfo: Effect;
    fetchAlertList: Effect;
  };
}
const CompanyModel: DashboardModelType = {
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
      DualAxes: {
        histgram: [],
        linegram: [],
      },
      alarmPie: [],
    },
    checkedCompanyId: undefined,
    enterpriseOptions: [],
    alertList: [],
    currentFlyData: {
      id: 0,
      name: '',
      data: [],
      create_time: '',
      creator: '',
    },
    alertData: {
      id: 0,
      name: '',
      image: '',
      type: 0,
      code: '',
      level: 0,
      count: 0,
      platform: 0,
      start_time: '',
      end_time: '',
      note: '',
      lan: 0,
      lon: 0,
      altitude: 0,
      confirm: 0,
    },
  },
  reducers: {
    changeCurrentComponent(state: DashboardState, action: { payload: string }) {
      state.checkedCompanyId = action.payload;
    },
    saveCheckedCompanyID(state: DashboardState, action: { payload: string }) {
      state.checkedCompanyId = action.payload;
    },
    saveEnterpriseOptions(state: DashboardState, action: { payload: string[] }) {
      state.enterpriseOptions = action.payload;
    },
    saveDashboardInfo(state: DashboardState, action: { payload: DashboardInfoType }) {
      // console.log('saveDashboardInfo -> payload:', action.payload);
      state.dashboardInfo = action.payload;
    },
    saveAlertList(state: DashboardState, action: { payload: [] }) {
      state.alertList = action.payload;
    },
    saveCurrentFlyData(state: DashboardState, action: { payload: ListUavFlyDataType }) {
      if (action.payload?.data) {
        JSON.parse(JSON.stringify(action.payload?.data));
        console.log(
          'saveCurrentFlyData -> JSON.parse(JSON.stringify(action.payload.data)):',
          JSON.parse(JSON.stringify(action.payload?.data)),
        );
      }

      state.currentFlyData = action.payload;
      console.log('saveCurrentFlyData -> action.payload:', action.payload);
    },
    saveAlertData(state: DashboardState, action: { payload: ListAlertHistoryData }) {
      console.log('saveCurrentFlyData -> action.payload:', action.payload);
      state.alertData = action.payload;
    },
  },
  effects: {
    // *fetchEnterpriseOptions({ payload }, { call, put }) {

    //   const response = yield call(getDashboardInfo, payload);
    //   const { code, result } = response;
    //   if (code === '10001') {
    //     yield put({ type: 'saveEnterpriseOptions', payload: result ?? [] });
    //   }
    // },
    *fetchDashboardInfo({ payload }, { call, put }) {
      try {
        // @ts-ignore
        const response = yield call(getDashboardInfo, payload);
        // console.log('*fetchDashboardInfo -> response:', response);
        const { code, result } = response;
        // console.log('getData', res);
        if (code === '000000') {
          yield put({ type: 'saveDashboardInfo', payload: result ?? [] });
        }
      } catch (error) {
        console.log('catch getData:', error);
      }
    },
    *fetchAlertList({ payload }, { call, put }) {
      try {
        // @ts-ignore
        const response = yield call(getAlertList, payload);
        const { result } = response;
        console.log('*fetchAlertList -> result:', result);
        // console.log('getData', res);

        yield put({ type: 'saveAlertList', payload: result ?? [] });
      } catch (error) {
        console.log('catch getData:', error);
      }
    },
  },
};

export default CompanyModel;

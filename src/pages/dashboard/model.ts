/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-16 18:32:55
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-27 13:18:54
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
  /**
   *
   *
   * @type {string} 存在于index界面的,组件切换状态
   * @memberof DashboardState
   */
  currentComponent: string;

  /**
   *
   *
   * @type {DashboardInfoType} 所有组件页面,只在实例化时请求一次的统计和显示数据
   * @memberof DashboardState
   */
  dashboardInfo: DashboardInfoType;
  alertList: string[];
  currentFlyData: ListUavFlyDataType;
  alertData: ListAlertHistoryData;

  /**
   *
   *
   * @type {boolean} 路线编辑信号
   * @memberof DashboardState
   */
  editRoadSignal: boolean;

  /**
   *
   *
   * @type {[]}
   * @memberof DashboardState
   */
  currentRoad: [];
}
export interface DashboardModelType {
  namespace: 'dashboardModel';
  state: DashboardState;
  reducers: {
    changeCurrentComponent: ImmerReducer<string> | any;
    saveDashboardInfo: ImmerReducer<string> | any;
    saveAlertList: ImmerReducer<string> | any;
    saveCurrentFlyData: ImmerReducer<string> | any;
    saveAlertData: ImmerReducer<string> | any;
    saveCurrentRoad: ImmerReducer<string> | any;
    changeEditRoadSignal: ImmerReducer<boolean> | any;
  };
  effects: {
    fetchDashboardInfo: Effect;
    fetchAlertList: Effect;
  };
}
const CompanyModel: DashboardModelType = {
  namespace: 'dashboardModel',

  state: {
    currentComponent: 'Analysis',
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
    editRoadSignal: false,
    currentRoad: [],
  },
  reducers: {
    changeCurrentComponent(state: DashboardState, action: { payload: string }) {
      state.currentComponent = action.payload;
    },

    saveDashboardInfo(state: DashboardState, action: { payload: DashboardInfoType }) {
      // console.log('saveDashboardInfo -> payload:', action.payload);
      state.dashboardInfo = action.payload;
    },
    saveAlertList(state: DashboardState, action: { payload: [] }) {
      state.alertList = action.payload;
    },
    changeEditRoadSignal(state: DashboardState, action: { payload: boolean }) {
      state.editRoadSignal = action.payload;
      console.log('changeEditRoadSignal -> action.payload:', action.payload);
    },
    saveCurrentRoad(state: DashboardState, action: { payload: [] }) {
      state.currentRoad = action.payload;
      console.log('saveCurrentRoad ->  action.payload:', action.payload);
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

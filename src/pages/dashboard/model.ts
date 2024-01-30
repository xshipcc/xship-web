/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-16 18:32:55
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2024-01-25 15:25:44
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\model.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import type { Effect, ImmerReducer } from 'umi';
import { getDashboardInfo } from './service';
import { getAlertList } from './service';
import type { DashboardAnalysData, DashboardInfoType, DroneDataType, DataHangr } from './typings';
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
  position: string;

  /**
   *
   *
   * @type {DashboardInfoType} 所有组件页面,只在实例化时请求一次的统计和显示数据
   * @memberof DashboardState
   */
  dashboardInfo: DashboardInfoType;
  analysisInfo: DashboardAnalysData;
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
  editPointSignal: string;
  isModalOpen: boolean;
  /**
   *
   *
   * @type {[]}
   * @memberof DashboardState
   */
  currentRoad: [];
  currentFlyingRoad: [];
  currentPoint: {};
  destoryTackSignal: [boolean];
  currentFlyingid: number;
  centering: boolean;
  showDetail: boolean;
  hangar: DataHangr;
  dashboardinfoMqtt: {};
  currentHistoryData: any;
  currentTab: any;
  queryAlertData: any;
}
export interface DashboardModelType {
  namespace: 'dashboardModel';
  state: DashboardState;
  reducers: {
    changeDestoryTackSignal: ImmerReducer<string> | any;
    changePosition: ImmerReducer<string> | any;
    changeCurrentComponent: ImmerReducer<string> | any;
    changeCentering: ImmerReducer<boolean> | any;
    saveDashboardInfo: ImmerReducer<string> | any;
    saveAlertList: ImmerReducer<string> | any;
    saveCurrentFlyData: ImmerReducer<string> | any;
    saveAlertData: ImmerReducer<string> | any;
    saveCurrentRoad: ImmerReducer<string> | any;
    saveCurrentFlyingRoad: ImmerReducer<string> | any;
    saveCurrentPoint: ImmerReducer<string> | any;
    changeEditRoadSignal: ImmerReducer<boolean> | any;
    changeEditPointSignal: ImmerReducer<string> | any;
    changeisModalOpen: ImmerReducer<boolean> | any;
    changeshowDetail: ImmerReducer<boolean> | any;
    changecurrentFlyingid: ImmerReducer<boolean> | any;
    changedashboardinfoMqtt: ImmerReducer<boolean> | any;
    changecurrentHistoryData: ImmerReducer<boolean> | any;
    changeAnalysisInfo: ImmerReducer<boolean> | any;
    setHangarInfo: ImmerReducer<boolean> | any;
    changecurrentTab: ImmerReducer<boolean> | any;
    setqueryAlertData: ImmerReducer<boolean> | any;
  };
  effects: {
    fetchDashboardInfo: Effect;
    fetchAlertList: Effect;
  };
}
const CompanyModel: DashboardModelType = {
  namespace: 'dashboardModel',

  state: {
    destoryTackSignal: [false],
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
    analysisInfo: {
      data: [
        {
          id: 0,
          type: 0,
          lat: 0,
          lon: 0,
          alt: 0,
        },
        {
          id: 0,
          type: 0,
          lat: 0,
          lon: 0,
          alt: 0,
        },
        {
          id: 0,
          type: 0,
          lat: 0,
          lon: 0,
          alt: 0,
        },
        {
          id: 0,
          type: 0,
          lat: 0,
          lon: 0,
          alt: 0,
        },
      ],
      week_data: [0, 0, 0, 0, 0, 0, 0],
      alert_total: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      alert_confirms: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      alert_not_confirms: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      today_yesterday: {
        todaydata: [0, 0, 0],
        ydataToday: [0, 0, 0],
      },
      total: 32,
      completion: 2,
      totaltime: 3,
    },
    checkedCompanyId: undefined,
    position: '',
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
      lat: 0,
      lon: 0,
      alt: 0,
      confirm: 0,
    },
    editRoadSignal: false,
    editPointSignal: '0', //未编辑 0   编辑地图 1   编辑地图完成 2
    isModalOpen: false,
    currentRoad: [],
    currentPoint: {
      coord: [0, 0, 0],
      speed: 5,
      time: 10,
      radius: 25,
      mode: '00', // "00=定点;01=环绕",
      direction: '00', //"00=逆时针;01=顺时针"
    },
    currentFlyingRoad: [],
    currentFlyingid: -1,
    showDetail: false,
    centering: true,
    currentHistoryData: {
      create_time: '2023-12-1 12:36:41',
      end_time: '2023-12-1 13:38:39',
      fly_id: 81,
      id: 87,
      operator: '叶勇',
      uav_id: 83,
    },
    dashboardinfoMqtt: {
      monitor: {
        lat: 0,
        lon: 0,
        target_height: 0,
        tf_usage: 0,
        tf_total: 0,
      },
      hangar: {
        battery_v: 0,
        battery_temp: 0,
        hatch: 0,
        charge: 0,
        homing: 0,
        uavpower_status: 0,
      },
      drone: {
        lat: 0.00000000000001,
        lon: 0.00000000000001,
        height: 0.00000000000001,
        pitch: 0,
        trajectory: 0,
        roll_angle: 0,
        rel_height: 0,
        target_height: 0,
        fly_time: 0,
        fly_distance: 0,
        speed: 0,
        gps_speed: 0,
        freq: 0,
      },
    },
    hangar: {
      drone: {
        check: true,
        unlock: true,
        lock: true,
        takeoff: true,
        return: true,
        land: true,
        light: true,
        mode: true,
        historyid: -1,
        freq: true,
      },
      monitor: {
        video: true,
        photo: true,
        positioning: true,
      },
      hangar: {
        hatch: false,
        charging: true,
        mechanism: true,
        wind_angle: '0',
        rain_snow: '0',
        out_temp: '0',
        in_temp: '0',
      },
      player: {
        play: -1,
        pause: true,
        speed: true,
      },
      queryAlertData: [],
      currentTab: 'hangar',
    },
  },
  reducers: {
    changeCurrentComponent(state: DashboardState, action: { payload: string }) {
      state.currentComponent = action.payload;
    },
    setqueryAlertData(state: DashboardState, action: { payload: string }) {
      state.queryAlertData = action.payload;
    },
    changecurrentTab(state: DashboardState, action: { payload: string }) {
      state.currentTab = action.payload;
    },
    setHangarInfo(state: DashboardState, action: { payload: DataHangr }) {
      state.hangar = action.payload;
    },
    changeCentering(state: DashboardState, action: { payload: boolean }) {
      state.centering = action.payload;
    },
    changePosition(state: DashboardState, action: { payload: string }) {
      state.position = action.payload;
    },
    changeAnalysisInfo(state: DashboardState, action: { payload: DashboardAnalysData }) {
      state.analysisInfo = action.payload;
    },
    changeDestoryTackSignal(state: DashboardState, action: { payload: [boolean] }) {
      // console.log('changeEditSignal -> payload:', action.payload);
      state.destoryTackSignal = action.payload;
      // console.log('changeEditSignal ->   state.editSignal:', state.editSignal);
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
    changeEditPointSignal(state: DashboardState, action: { payload: string }) {
      state.editPointSignal = action.payload;
      console.log('changeEditPointSignal -> state.editPointSignal:', state.editPointSignal);
    },
    changeisModalOpen(state: DashboardState, action: { payload: boolean }) {
      state.isModalOpen = action.payload;
    },
    saveCurrentRoad(state: DashboardState, action: { payload: [] }) {
      state.currentRoad = action.payload;
      console.log('saveCurrentRoad ->  action.payload:', action.payload);
    },
    saveCurrentPoint(state: DashboardState, action: { payload: [] }) {
      state.currentPoint = action.payload;
      console.log('saveCurrentRoad ->  action.payload:', action.payload);
    },
    saveCurrentFlyingRoad(state: DashboardState, action: { payload: [] }) {
      state.currentFlyingRoad = action.payload;
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
    changecurrentFlyingid(state: DashboardState, action: { payload: number }) {
      console.log('changecurrentFlyingid -> payload:', action.payload);
      state.currentFlyingid = action.payload;
    },
    changeshowDetail(state: DashboardState, action: { payload: boolean }) {
      state.showDetail = action.payload;
    },
    changecurrentHistoryData(state: DashboardState, action: { payload: boolean }) {
      state.currentHistoryData = action.payload;
      console.log('changecurrentHistoryData -> action.payload:', state.currentHistoryData);
    },
    changedashboardinfoMqtt(state: DashboardState, action: { payload: any }) {
      state.dashboardinfoMqtt[action.payload.type] = action.payload.data;
      console.log('changedashboardinfoMqtt -> state.dashboardinfoMqtt:', state.dashboardinfoMqtt);
      console.log('changedashboardinfoMqtt -> dashboardinfoMqtt:', action.payload);
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

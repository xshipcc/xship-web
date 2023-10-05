/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-16 18:32:55
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-10-06 03:04:12
 * @FilePath: \zero-admin-ui-master\src\models\track.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import type { Effect, ImmerReducer } from 'umi';

export interface TrackState {
  checkedCompanyId: string | undefined;
  enterpriseOptions: string[];
  alertList: string[];
  trackList: [];
  entities: {};
  editSignal: [boolean, boolean];
  destoryTackSignal: [boolean];
}
export interface CompanyModelType {
  namespace: 'trackModel';
  state: TrackState;
  reducers: {
    saveCheckedCompanyID: ImmerReducer<string> | any;
    saveEnterpriseOptions: ImmerReducer<string> | any;
    saveAlertList: ImmerReducer<string> | any;
    saveTrackList: ImmerReducer<string> | any;
    saveEntities: ImmerReducer<string> | any;
    changeEditSignal: ImmerReducer<string> | any;
    changeDestoryTackSignal: ImmerReducer<string> | any;
  };
  effects: {
    // fetchEnterpriseOptions: Effect;
    fetchDashboardInfo: Effect;
    fetchAlertList: Effect;
  };
}
const TrackModel: CompanyModelType = {
  namespace: 'trackModel',
  state: {
    checkedCompanyId: undefined,
    enterpriseOptions: [],
    alertList: [],
    trackList: [],
    entities: {},
    editSignal: [false, false],
    destoryTackSignal: [false],
  },
  reducers: {
    saveCheckedCompanyID(state: TrackState, action: { payload: string }) {
      state.checkedCompanyId = action.payload;
    },
    saveEnterpriseOptions(state: TrackState, action: { payload: string[] }) {
      state.enterpriseOptions = action.payload;
    },
    saveAlertList(state: TrackState, action: { payload: [] }) {
      state.alertList = action.payload;
      console.log('saveAlertList ->    state.alertList :', state.alertList);
    },
    saveTrackList(state: TrackState, action: { payload: [] }) {
      state.trackList = action.payload;
      console.log('saveAlertList ->    state.alertList :', state.trackList);
    },
    saveEntities(state: TrackState, action: { payload: [] }) {
      state.entities = action.payload;
      console.log('saveEntities -> action.payload:', action.payload);
    },
    changeEditSignal(state: TrackState, action: { payload: [boolean, boolean] }) {
      // console.log('changeEditSignal -> payload:', action.payload);
      state.editSignal = action.payload;
      // console.log('changeEditSignal ->   state.editSignal:', state.editSignal);
    },
    changeDestoryTackSignal(state: TrackState, action: { payload: [boolean] }) {
      // console.log('changeEditSignal -> payload:', action.payload);
      state.destoryTackSignal = action.payload;
      // console.log('changeEditSignal ->   state.editSignal:', state.editSignal);
    },
  },
  effects: {
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

export default TrackModel;

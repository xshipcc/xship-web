// /*
//  * @Author: JavoData
//  * @Date: 2022-05-10 10:55:56
//  * @LastEditors: Javodata
//  * @LastEditTime: 2022-06-29 14:56:57
//  * @FilePath: /ai-monitor-ui/src/models/company.ts
//  * @Description:
//  */
// import { queryCompanyTree } from '@/services/company';
// import type { CompanyItem } from '@/services/company/typings';
// import type { Effect, ImmerReducer } from 'umi';

// export interface CompanyState {
//   company: CompanyItem[];
//   checkedCompanyId: string | undefined;
//   enterpriseOptions: CompanyItem[];
// }
// export interface CompanyModelType {
//   namespace: 'companyModel';
//   state: CompanyState;
//   reducers: {
//     // 启用 immer 之后
//     saveCompany: ImmerReducer<CompanyState> | any;
//     saveCheckedCompanyID: ImmerReducer<CompanyState> | any;
//     saveEnterpriseOptions: ImmerReducer<CompanyState> | any;
//   };
//   effects: {
//     fetchEnterpriseOptions: Effect;
//   };
// }
// const CompanyModel: CompanyModelType = {
//   namespace: 'companyModel',
//   state: {
//     company: [],
//     checkedCompanyId: undefined,
//     enterpriseOptions: [],
//   },
//   reducers: {
//     saveCompany(state: CompanyState, action: { payload: CompanyItem[] }) {
//       state.company = action.payload;
//     },
//     saveCheckedCompanyID(state: CompanyState, action: { payload: string }) {
//       state.checkedCompanyId = action.payload;
//     },
//     saveEnterpriseOptions(state: CompanyState, action: { payload: CompanyItem[] }) {
//       state.enterpriseOptions = action.payload;
//     },
//   },
//   effects: {
//     *fetchEnterpriseOptions({ payload }, { call, put }) {
//       const response = yield call(queryCompanyTree, payload);
//       const { code, result } = response;
//       if (code === '10001') {
//         yield put({ type: 'saveEnterpriseOptions', payload: result ?? [] });
//       }
//     },
//   },
// };

// export default CompanyModel;

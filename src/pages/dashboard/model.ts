// import type { Effect, ImmerReducer, Subscription } from 'umi';
// import { getDashboardInfo } from './service';

// export interface CompanyState {
//     company: CompanyItem[];
//     checkedCompanyId: string | undefined;
//     enterpriseOptions: CompanyItem[];
// }
// export interface CompanyModelType {
//     namespace: 'companyModel';
//     state: CompanyState;
//     reducers: {
//         // 启用 immer 之后
//         saveCompany: ImmerReducer<CompanyState> | any;
//         saveCheckedCompanyID: ImmerReducer<CompanyState> | any;
//         saveEnterpriseOptions: ImmerReducer<CompanyState> | any;
//     };
//     effects: {
//         fetchEnterpriseOptions: Effect;
//     };
// }
// const CompanyModel: CompanyModelType = {
//     namespace: 'companyModel',
//     state: {
//         company: [],
//         checkedCompanyId: undefined,
//         enterpriseOptions: [],
//     },
//     reducers: {
//         saveCompany(state: CompanyState, action: { payload: CompanyItem[] }) {
//             state.company = action.payload;
//         },
//         saveCheckedCompanyID(state: CompanyState, action: { payload: string }) {
//             state.checkedCompanyId = action.payload;
//         },
//         saveEnterpriseOptions(state: CompanyState, action: { payload: CompanyItem[] }) {
//             state.enterpriseOptions = action.payload;
//         },
//     },
//     effects: {
//         *fetchEnterpriseOptions({ payload }, { call, put }) {
//             // @ts-ignore
//             const response = yield call(getDashboardInfo, payload);
//             const { code, result } = response;
//             if (code === '10001') {
//                 yield put({ type: 'saveEnterpriseOptions', payload: result ?? [] });
//             }
//         },
//     },
// };

// export default CompanyModel;

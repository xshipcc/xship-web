// /*
//  * @Author: JavoData
//  * @Date: 2022-02-17 16:57:29
//  * @LastEditors: JavoData
//  * @LastEditTime: 2022-02-18 09:43:15
//  * @Description: description
//  * @FilePath: /ai-monitor-ui/src/models/dept.ts
//  */

// import { fetchDeptTree } from '@/services/system/dept';
// import type { DeptMenuItem } from '@/services/system/dept/typings';
// import type { ImmerReducer, Effect } from 'umi';

// export interface DeptTree {
//   title: string;
//   value: string;
//   children: DeptTree[];
// }
// export interface DeptState {
//   selectTree: DeptMenuItem[];
// }
// export interface DeptModel {
//   namespace: 'deptModel';
//   state: DeptState;
//   reducers: {
//     // 启用 immer 之后
//     saveDeptTree: ImmerReducer<DeptState>;
//   };
//   effects: {
//     fetchTree: Effect;
//   };
// }
// const DeptTreeModel: DeptModel = {
//   namespace: 'deptModel',
//   state: {
//     selectTree: [],
//   },

//   reducers: {
//     saveDeptTree(state: DeptState, action: { payload: DeptMenuItem[] }) {
//       state.selectTree = action.payload;
//     },
//   },
//   effects: {
//     *fetchTree({ payload }, { call, put }) {
//       const respone = yield call(fetchDeptTree, payload);
//       const { status, result } = respone;
//       if (status === 200) {
//         yield put({ type: 'saveDeptTree', payload: result });
//       }
//     },
//   },
// };

// export default DeptTreeModel;

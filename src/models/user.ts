// import type { UserInfo } from '@/services/login/typings';
// import type { ImmerReducer } from 'umi';

// export interface UserState {
//   user: UserInfo;
// }

// export interface UserModel {
//   namespace: 'userModel';
//   state: UserState;
//   reducers: {
//     // 启用 immer 之后
//     saveUser: ImmerReducer<UserState>;
//     removeUser: ImmerReducer;
//   };
// }
// const CurrentModel: UserModel = {
//   namespace: 'userModel',
//   state: {
//     user: {} as UserInfo,
//   },

//   reducers: {
//     saveUser(state: UserState, action: { payload: UserInfo }) {
//       state.user = action.payload;
//     },
//     removeUser(state: UserState) {
//       state.user = {} as UserInfo;
//     },
//   },
// };

// export default CurrentModel;

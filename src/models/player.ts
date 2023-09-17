// /*
//  * @Author: JavoData
//  * @Date: 2022-02-21 10:18:49
//  * @LastEditors: JavoData
//  * @LastEditTime: 2022-02-21 10:33:17
//  * @Description: description
//  * @FilePath: /ai-monitor-ui/src/models/player.ts
//  */

// import { fetchPlayUrl } from '@/services/monitor';
// import type { PlayerItem } from '@/services/monitor/typings';
// import type { ImmerReducer, Effect } from 'umi';

// export interface PlayState {
//   player: PlayerItem;
// }

// export interface PlayerModel {
//   namespace: 'playerModel';
//   state: {
//     player: PlayerItem;
//   };
//   reducers: {
//     // 启用 immer 之后
//     savePlayer: ImmerReducer<PlayerItem>;
//   };
//   effects: {
//     fetchPlayer: Effect;
//   };
// }
// const PlayerVidelModel: PlayerModel = {
//   namespace: 'playerModel',
//   state: {
//     player: null,
//   },

//   reducers: {
//     savePlayer(state: PlayState, action: { payload: PlayerItem }) {
//       state.player = action.payload;
//     },
//   },
//   effects: {
//     *fetchPlayer({ payload }, { call, put }) {
//       console.log('xxxxxCome');

//       const respone = yield call(fetchPlayUrl, payload);
//       const { status, result } = respone;
//       console.log('xxxxx', result);

//       if (status === 200) {
//         yield put({ type: 'savePlayer', payload: result });
//       }
//     },
//   },
// };

// export default PlayerVidelModel;

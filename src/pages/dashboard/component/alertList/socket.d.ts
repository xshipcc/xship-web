/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-19 20:41:59
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-20 00:10:02
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\alertList\socket.d.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import type { Socket } from 'socket.io-client';

interface ServerToClientEvents {
  [key: string]: (msg: any) => void;
  server: () => void;
}

interface ClientToServerEvents {
  [key: string]: (msg: any) => void;
  client: () => void;
}
// 注意，这里类型事件是有顺序的，先服务端后客户端，可以查阅 https://socket.io/docs/v4/typescript/#types-for-the-client
export type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>;

/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-19 22:04:08
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-19 22:14:18
 * @FilePath: \zero-admin-ui-master\socketTest\src\type\index.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Server } from 'socket.io';

interface ServerToClientEvents {
  alert_msg: (msg: {}) => void;
  server: () => void;
}

interface ClientToServerEvents {
  alert_msg: (msg: {}) => void;
  client: () => void;
}

interface InterServerEvents {}
// 注意：在服务端这里的顺利是客户端后服务端的事件类型，而客户端的socket设置是相反的。可以查阅 https://socket.io/docs/v4/typescript/#types-for-the-server
export type ServerType = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents>;

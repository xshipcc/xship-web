'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-19 22:04:08
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-19 22:13:45
 * @FilePath: \zero-admin-ui-master\socketTest\src\server.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
const express_1 = __importDefault(require('express'));
const http_1 = __importDefault(require('http'));
const socket_io_1 = require('socket.io');
class App {
  constructor(port) {
    this.app = (0, express_1.default)();
    this.server = http_1.default.createServer(this.app);
    this.io = new socket_io_1.Server(this.server, {
      cors: {
        origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:8000'],
        credentials: true,
      },
    });
    this.port = port;
  }
  start() {
    this.server.listen(this.port, () => {
      console.log(`Server listening on ${this.port}`);
    });
    this.io.on('connection', (socket) => {
      console.log('App -> this.io.on -> socket:', socket);
      console.log(`${socket.id} join session`);
      socket.emit('alert_msg', '这是来自服务器的消息');
      socket.on('disconnect', () => {
        console.log(`${socket.id} leave session`);
      });
      socket.on('alert_msg', (msg) => {
        console.log(`message: ${msg}`);
        this.io.emit('alert_msg', msg);
      });
    });
  }
}
new App(3000).start();

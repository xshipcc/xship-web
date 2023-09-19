/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-19 22:04:08
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-09-20 00:21:31
 * @FilePath: \zero-admin-ui-master\socketTest\src\server.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { ServerType } from './type';

class App {
  private app = express();
  private server = http.createServer(this.app);
  private port: number;
  private io: ServerType = new Server(this.server, {
    cors: {
      origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:8000'],
      credentials: true,
    },
  });

  constructor(port: number) {
    this.port = port;
  }
  public start() {
    this.server.listen(this.port, () => {
      console.log(`Server listening on ${this.port}`);
    });

    this.io.on('connection', (socket) => {
      console.log('App -> this.io.on -> socket:', socket);
      console.log(`${socket.id} join session`);

      let alertMsg = {
        results: [
          {
            id: '0',
            name: {
              type: 'Ms',
              time: 'Ava',
              info: 'Dumas',
              coordinate: ['111', '111'],
              last: 'Dumas',
            },
          },
        ],
      };
      // 执行十遍
      function executeTenTimes(fn: () => void) {
        let count = 0;
        const intervalId = setInterval(() => {
          fn();
          count++;
          if (count === 100) {
            clearInterval(intervalId);
          }
        }, 5000);
      }
      function test() {
        socket.emit('alert_msg', JSON.stringify(alertMsg));
      }

      executeTenTimes(test);
      // socket.on('alert_msg', (msg) => {
      //   // console.log(`message: ${msg}`);
      //   this.io.emit('alert_msg', msg);
      // });

      socket.on('disconnect', () => {
        console.log(`${socket.id} leave session`);
      });
    });
  }
}

new App(3000).start();

/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-09-19 22:04:08
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-11-06 14:08:16
 * @FilePath: \zero-admin-ui-master\socketTest\src\server.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { ServerType } from './type';
import { random } from 'lodash';
interface Alert {
  type: string;
  time: string;
  info: string;
  coordinate: [string, string];
}

interface Result {
  id: string;
  alert: Alert;
}

function generateRandomTime(): string {
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);
  const seconds = Math.floor(Math.random() * 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
}
function generateRandomString(length: number): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}
const alert = {
  id: 1,
  name: 'Alert Name',
  image: 'alert.jpg',
  type: 2,
  code: 'AL001',
  level: 3,
  count: 10,
  platform: 1,
  start_time: '2023-11-06 09:00:00',
  end_time: '2023-11-07 18:00:00',
  note: 'This is an alert',
  lat: 38.0865966192828,
  lon: 114.33264199360657,
  alt: 97.20427051352851,
  history_id: 101,
  confirm: 0,
};
function generateData() {
  // 114.33264199360657, 38.0865966192828, 97.20427051352851
  alert.alt += 0.0001;
  alert.lon += 0.0001;
  alert.alt += 10;
  return alert;
}

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

      // 执行十遍
      function executeTenTimes(fn: () => void) {
        let count = 0;
        const intervalId = setInterval(() => {
          fn();
          count++;
          if (count === 10) {
            clearInterval(intervalId);
          }
        }, 10000);
      }
      function test() {
        const generatedData = generateData();
        console.log('App -> test -> generatedData:', generatedData);
        // console.log(generatedData);
        socket.emit('alert', JSON.stringify(generatedData));
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

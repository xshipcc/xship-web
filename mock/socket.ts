// import express from "express";
// import http from "http";
// import { Server } from "socket.io";

// interface ServerToClientEvents {
//     chat_msg: (msg: string) => void;
//     server: () => void;
// }

// interface ClientToServerEvents {
//     chat_msg: (msg: string) => void;
//     client: () => void;
// }

// interface InterServerEvents { }
// // 注意：在服务端这里的顺利是客户端后服务端的事件类型，而客户端的socket设置是相反的。可以查阅 https://socket.io/docs/v4/typescript/#types-for-the-server
// export type ServerType = Server<
//     ClientToServerEvents,
//     ServerToClientEvents,
//     InterServerEvents
// >;

// class App {
//     private app = express();
//     private server = http.createServer(this.app);
//     private port: number;
//     private io: ServerType = new Server(this.server, {
//         cors: { origin: ["http://localhost:5173", "http://127.0.0.1:5173"], credentials: true },
//     });

//     constructor(port: number) {
//         this.port = port;
//     }
//     public start() {
//         this.server.listen(this.port, () => {
//             console.log(`Server listening on ${this.port}`);
//         });

//         this.io.on("connection", (socket) => {
//             console.log('App -> this.io.on -> socket:', socket)
//             console.log(`${socket.id} join session`);
//             socket.on("disconnect", () => {
//                 console.log(`${socket.id} leave session`);
//             });
//             socket.on("chat_msg", (msg) => {
//                 console.log(`message: ${msg}`);
//                 this.io.emit("chat_msg", msg);
//             });
//         });
//     }
// }

// new App(3000).start();

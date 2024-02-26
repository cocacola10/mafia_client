import { io, Socket } from "socket.io-client";

let socket: Socket;

export function getSocket(): Socket {
  if (socket == null){
    socket = io("http://localhost:3001", { transports: ["websocket"] });
  }
  return socket;
}
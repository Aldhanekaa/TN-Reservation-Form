import { io } from "socket.io-client";
const socket = io(
  `${process.env.NEXT_PUBLIC_REALTIME_SERVER}/websocket/visitor` ||
    "http://localhost:3030/websocket/visitor",
  {
    autoConnect: false,
    transports: ["websocket"],
  }
);

export default socket;

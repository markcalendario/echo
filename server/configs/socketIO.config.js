import { Server } from "socket.io";

export default function initializeSocketIO(app) {
  const io = new Server(app, { cors: { origin: process.env.CLIENT_URL } });

  // Events
}

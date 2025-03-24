import streamEvents from "#src/socket-events/socket-events.js";
import { Server } from "socket.io";

export default function initializeSocketIO(app, server) {
  const io = new Server(server, { cors: { origin: process.env.CLIENT_URL } });
  app.set("io", io);

  streamEvents(io);
}

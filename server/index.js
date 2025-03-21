import dotenv from "dotenv";
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import intializeServer from "./configs/server.config.js";
import initializeSocketIO from "./configs/socketIO.config.js";
const app = express();
const server = createServer(app);

// Environment Variables
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// Socket Configuration (Socket.io)
const io = new Server(server, { cors: { origin: process.env.CLIENT_URL } });
app.set("io", io);
initializeSocketIO(io);

// Server Configuration (Express)
intializeServer(app);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

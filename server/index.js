import { updateHeartbeats } from "#src/cron/stream-heartbeat.js";
import { CronJob } from "cron";
import dotenv from "dotenv";
import express from "express";
import { createServer } from "node:http";
import intializeServer from "./configs/server.config.js";
import initializeSocketIO from "./configs/socketIO.config.js";

const app = express();
const server = createServer(app);

// Environment Variables
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// Socket Configuration (Socket.io)
initializeSocketIO(app, server);

// Server Configuration (Express)
intializeServer(app);

new CronJob("*/5 * * * * *", updateHeartbeats, null, true);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

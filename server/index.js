import dotenv from "dotenv";
import express from "express";
import { createServer } from "node:http";
import intializeServer from "./configs/server.config.js";
import initializeSocketIO from "./configs/socketIO.config.js";
const expressServer = express();
const app = createServer(expressServer);

// Environment Variables
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// Server Configuration (Express)
intializeServer(expressServer);

// Socket Configuration (Socket.io)
initializeSocketIO(app);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

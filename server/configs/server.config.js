import Routes from "#src/api/api.routes.js";
import cookieParser from "cookie-parser";
import express from "express";

export default function intializeServer(app) {
  // Configurations
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));

  // Middleware to handle CORS
  app.use((req, res, next) => {
    const client = process.env.CLIENT_URL;
    res.header("Access-Control-Allow-Origin", client);
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
  });

  // Routes
  app.use("/", Routes);
}

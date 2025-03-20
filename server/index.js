import Routes from "#src/api/api.routes.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
const app = express();

// Configurations
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// Middleware to handle CORS
app.use((req, res, next) => {
  const client = process.env.CLIENT;
  res.header("Access-Control-Allow-Origin", client);
  next();
});

// Routes
app.use("/", Routes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

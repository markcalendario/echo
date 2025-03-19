import dotenv from "dotenv";
import express from "express";
const app = express();

// Configurations
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// Middleware to handle CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

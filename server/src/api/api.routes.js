import express from "express";
import Auth from "./auth/auth.routes.js";
const router = express.Router();

router.use("/auth", Auth);

export default router;

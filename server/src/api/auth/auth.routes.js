import express from "express";
import { handlePostRegister } from "./auth.handlers.js";
import { validatePostRegister } from "./auth.middlewares.js";
const router = express.Router();

router.post("/register", validatePostRegister, handlePostRegister);

export default router;

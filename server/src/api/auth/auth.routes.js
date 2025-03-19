import express from "express";
import { handleRegister } from "./auth.handlers.js";
import { validateRegister } from "./auth.middlewares.js";
const router = express.Router();

router.post("/register", validateRegister, handleRegister);

export default router;

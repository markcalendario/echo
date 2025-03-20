import express from "express";
import { handlePostLogin, handlePostRegister } from "./auth.handlers.js";
import { validatePostLogin, validatePostRegister } from "./auth.middlewares.js";
const router = express.Router();

router.post("/register", validatePostRegister, handlePostRegister);
router.post("/login", validatePostLogin, handlePostLogin);

export default router;

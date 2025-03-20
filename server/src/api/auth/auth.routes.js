import express from "express";
import { handlePostSignIn, handlePostSignUp } from "./auth.handlers.js";
import { validatePostSignIn, validatePostSignUp } from "./auth.middlewares.js";
const router = express.Router();

router.post("/sign-up", validatePostSignUp, handlePostSignUp);
router.post("/sign-in", validatePostSignIn, handlePostSignIn);

export default router;

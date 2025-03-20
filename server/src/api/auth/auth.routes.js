import express from "express";
import {
  handlePostSignIn,
  handlePostSignUp,
  handleSignOut
} from "./auth.handlers.js";
import { validatePostSignIn, validatePostSignUp } from "./auth.middlewares.js";
const router = express.Router();

router.post("/sign-up", validatePostSignUp, handlePostSignUp);
router.post("/sign-in", validatePostSignIn, handlePostSignIn);
router.post("/sign-out", handleSignOut);

export default router;

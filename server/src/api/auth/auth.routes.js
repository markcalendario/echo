import {
  publicRoute,
  signedInRoute
} from "#src/globals/auth/auth.middlewares.js";
import express from "express";
import {
  handlePostSignIn,
  handlePostSignUp,
  handleSignOut
} from "./auth.handlers.js";
import { validatePostSignIn, validatePostSignUp } from "./auth.middlewares.js";
const router = express.Router();

router.post("/sign-up", publicRoute, validatePostSignUp, handlePostSignUp);
router.post("/sign-in", publicRoute, validatePostSignIn, handlePostSignIn);
router.post("/sign-out", signedInRoute, handleSignOut);

export default router;

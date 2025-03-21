import { signedInRoute } from "#src/globals/auth/auth.middlewares.js";
import express from "express";
import { handleGetID, handleGetUsername } from "./users.handlers.js";
const router = express.Router();

router.get("/id", signedInRoute, handleGetID);
router.get("/username", signedInRoute, handleGetUsername);

export default router;

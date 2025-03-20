import { signedInRoute } from "#src/globals/auth/auth.middlewares.js";
import express from "express";
import { handleGetUsername } from "./users.handlers.js";
const router = express.Router();

router.get("/username", signedInRoute, handleGetUsername);

export default router;

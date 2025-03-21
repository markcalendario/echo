import { signedInRoute } from "#src/globals/auth/auth.middlewares.js";
import express from "express";
import { handleGetStreamKey } from "./streams.handlers.js";
const router = express();

router.get("/stream-key", signedInRoute, handleGetStreamKey);

export default router;

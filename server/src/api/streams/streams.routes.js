import { signedInRoute } from "#src/globals/auth/auth.middlewares.js";
import express from "express";
import {
  handleGetLiveStreamers,
  handleGetLiveStreams,
  handleGetStreamKey,
  handlePostEnd,
  handlePostStart
} from "./streams.handlers.js";
import {
  validateGetStreamKey,
  validateStreamKey
} from "./streams.middlewares.js";
const router = express.Router();

router.get("/live", signedInRoute, handleGetLiveStreams);

router.get("/live-streamers", signedInRoute, handleGetLiveStreamers);

router.get(
  "/stream-key",
  signedInRoute,
  validateGetStreamKey,
  handleGetStreamKey
);

// This route should be called only by the on_publish parameter of NGINX-RTMP
router.post("/start", validateStreamKey, handlePostStart);
router.post("/end", validateStreamKey, handlePostEnd);

export default router;

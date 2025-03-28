import express from "express";
import Auth from "./auth/auth.routes.js";
import Streams from "./streams/streams.routes.js";
import Users from "./users/users.routes.js";
const router = express.Router();

router.use("/auth", Auth);
router.use("/users", Users);
router.use("/streams", Streams);

export default router;

import prisma from "#prisma/prisma.js";
import { getUserIDFromAuthToken } from "#src/globals/auth/auth.utils.js";
import Joi from "joi";
import { isStreamKeyValid } from "./streams.utils.js";

export function validateStreamKey(req, res, next) {
  const streamKey = req.body?.name;

  const schema = Joi.string()
    .trim()
    .custom((value, helper) => {
      if (!isStreamKeyValid(streamKey)) {
        return helper.message("Stream key is expired or invalid.");
      }

      return value;
    })
    .required();

  const { error, value } = schema.validate(streamKey);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  req.body.name = value;
  next();
}

export async function validateGetStreamKey(req, res, next) {
  // Check if status is LIVE
  // Generate stream key only if OFFLINE

  const userID = getUserIDFromAuthToken(req.cookies.auth);

  try {
    const stream = await prisma.streams.findUnique({
      where: { userID: userID }
    });

    if (stream.status === "LIVE") {
      return res.json({
        success: false,
        message: "You are already live. Cannot regenerate stream key."
      });
    }

    next();
  } catch {
    return res.status(404).json({
      success: false,
      message: "Error. Failed to validate get stream key."
    });
  }
}

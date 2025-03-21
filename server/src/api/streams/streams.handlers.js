import prisma from "#prisma/prisma.js";
import { getUserIDFromAuthToken } from "#src/globals/auth/auth.utils.js";
import streamsSchema from "#src/schema/streams.schema.js";
import { getStreamData } from "#src/socket-events/streams.utils.js";
import { generateStreamKey, getUserIDFromStreamKey } from "./streams.utils.js";

export async function handleGetStreamKey(req, res) {
  const userID = getUserIDFromAuthToken(req.cookies.auth);
  const key = generateStreamKey(userID);

  // Upsert to the streams database

  try {
    await prisma.streams.upsert({
      where: { userID },
      update: { key },
      create: { userID, key, status: streamsSchema.status.allowedValues[0] }
    });

    return res.send({
      success: true,
      message: "Stream key generated successfully.",
      key
    });
  } catch {
    return res.status(500).send({
      success: false,
      message: "Error. Failed to generate stream key."
    });
  }
}

export async function handlePostStart(req, res) {
  const streamKey = req.body.name;
  const streamerID = getUserIDFromStreamKey(streamKey);

  try {
    // Check if the stream key is valid and exists in the streams database
    // And if the streamKey belongs to the userID

    const stream = await prisma.streams.findFirst({
      where: {
        AND: [{ key: streamKey }, { userID: streamerID }]
      }
    });

    // The streamKey does not belong to the userID

    if (!stream) {
      return res.status(404).send({
        success: false,
        message:
          "Not found. Stream key not found or does not belong to the user."
      });
    }

    // Update the status of the stream to "LIVE"
    await prisma.streams.update({
      where: { userID: streamerID },
      data: { status: streamsSchema.status.allowedValues[1] }
    });

    // Emit the stream data to the streamer's socket
    const streamData = await getStreamData(streamerID);
    const io = req.app.get("io");
    io.to(streamerID).emit("get-stream-data", streamData);

    return res.status(200).send({
      success: true,
      message: "Stream started successfully."
    });
  } catch {
    return res.status(500).send({
      success: false,
      message: "Error. Failed to start stream."
    });
  }
}

export async function handlePostEnd(req, res) {
  const streamKey = req.body.name;
  const streamerID = getUserIDFromStreamKey(streamKey);

  try {
    // Update the status of the stream to "OFFLINE"
    await prisma.streams.update({
      where: { userID: streamerID },
      data: { status: streamsSchema.status.allowedValues[0], key: "" }
    });

    // Emit the stream data to the streamer's socket
    const streamData = await getStreamData(streamerID);
    const io = req.app.get("io");
    io.to(streamerID).emit("get-stream-data", streamData);

    return res.status(200).send({
      success: true,
      message: "Stream ended successfully."
    });
  } catch {
    return res.status(500).send({
      success: false,
      message: "Error. Failed to end the stream."
    });
  }
}

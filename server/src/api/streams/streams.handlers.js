import prisma from "#prisma/prisma.js";
import { getUserIDFromAuthToken } from "#src/globals/auth/auth.utils.js";
import streamsSchema from "#src/schema/streams.schema.js";
import { generateStreamKey } from "./streams.utils.js";

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

export async function handleGetMyStream(req, res) {
  const userID = getUserIDFromAuthToken(req.cookies.auth);

  try {
    const stream = await prisma.streams.findUnique({
      where: { userID }
    });

    const ingest = `${process.env.INGEST_URL}/${stream.key}`;

    return res.send({
      success: true,
      message: "Stream fetched successfully.",
      stream: {
        ingest: ingest,
        key: stream.key,
        status: stream.status,
        userID: stream.userID.toString()
      }
    });
  } catch {
    return res.status(500).send({
      success: false,
      message: "Error. Failed to get your stream."
    });
  }
}

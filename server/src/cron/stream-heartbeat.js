import prisma from "#prisma/prisma.js";
import axios from "axios";

export async function updateHeartbeats() {
  const statURL = process.env.RTMP_STAT_URL;

  try {
    const { data } = await axios.get(statURL);

    const activeStreamKeys =
      data
        .match(/<name>(.*?)<\/name>/g)
        ?.map((tag) => tag.replace(/<\/?name>/g, "")) || [];

    if (activeStreamKeys.length === 0) {
      return console.log("Heartbeat: No active streams.");
    }

    console.log("Heartbeat: Active streams:", activeStreamKeys.length);

    for (const activeStreamKey of activeStreamKeys) {
      await prisma.streams.updateMany({
        data: { heartbeat: new Date() },
        where: { key: activeStreamKey }
      });
    }

    console.log("Heartbeat: Updated stream heartbeats.");
  } catch (e) {
    return console.error("Heartbeat: Error fetching RTMP stat data", e);
  }

  await checkOfflineStreams();
}

async function checkOfflineStreams() {
  try {
    const now = new Date();
    const offlineThreshold = new Date(now.getTime() - 10000);

    const result = await prisma.streams.updateMany({
      where: {
        AND: {
          status: "LIVE",
          heartbeat: {
            lt: offlineThreshold // 10 seconds
          }
        }
      },
      data: { status: "OFFLINE" }
    });

    console.log("Heartbeat: Dangling streams set to OFFLINE:", result.count);
  } catch (e) {
    console.error("Error updating stream statuses", e);
  }
}

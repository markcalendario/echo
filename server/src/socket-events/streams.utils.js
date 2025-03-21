import prisma from "#prisma/prisma.js";

export async function getStreamData(streamerID) {
  const stream = await prisma.streams.findUnique({
    where: { userID: streamerID }
  });

  const hlsPlayback = `${process.env.HLS_PLAYBACK_URL}/hls/${stream.key}/index.m3u8`;
  return {
    key: stream.key,
    status: stream.status,
    hlsPlayback: hlsPlayback,
    userID: stream.userID.toString()
  };
}

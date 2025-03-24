import { getStreamData } from "./streams.utils.js";

export async function handleGetStreamData(io, socket, streamerID) {
  await socket.join(streamerID);

  try {
    const data = await getStreamData(streamerID);
    socket.emit("get-stream-data", data);
  } catch {
    console.error("Error retrieving stream data for user:", streamerID);
  }
}

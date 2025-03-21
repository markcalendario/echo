import { getStreamData } from "./streams.utils.js";

export default function streamEvents(io) {
  io.on("connection", (socket) => {
    // Get Stream Data
    socket.on("get-stream-data", async (streamerID) => {
      socket.join(streamerID);

      try {
        const data = await getStreamData(streamerID);
        io.to(streamerID).emit("get-stream-data", data);
      } catch {
        console.error("Error retrieving stream data for user:", streamerID);
      }
    });
  });
}

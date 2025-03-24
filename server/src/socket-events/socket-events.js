import { handleGetStreamData } from "./streams/streams.handlers.js";

export default function streamEvents(io) {
  io.on("connection", (socket) => {
    // Event: Get Stream Data
    socket.on("get-stream-data", (streamData) =>
      handleGetStreamData(io, socket, streamData)
    );
  });
}

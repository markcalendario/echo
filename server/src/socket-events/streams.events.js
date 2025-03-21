import prisma from "#prisma/prisma.js";

export default function streamEvents(socket) {
  socket.on("get-stream-data", async (userID) => {
    socket.join(userID);

    try {
      const stream = await prisma.streams.findUnique({ where: { userID } });
      const ingest = `${process.env.INGEST_URL}/${stream.key}`;

      socket.emit("get-stream-data", {
        ingest: ingest,
        key: stream.key,
        status: stream.status,
        userID: stream.userID.toString()
      });
    } catch {
      console.error("Error retrieving stream data for user:", userID);
    }
  });
}

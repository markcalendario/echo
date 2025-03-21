import streamEvents from "#src/socket-events/streams.events.js";

export default function initializeSocketIO(io) {
  streamEvents(io);
}

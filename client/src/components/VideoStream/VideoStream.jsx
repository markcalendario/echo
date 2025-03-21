import useStreamer from "@/hooks/useStreamer.jsx";
import socket from "@/utils/socket.io.js";
import { useEffect, useRef, useState } from "react";
import { Controls } from "./Controls/Controls.jsx";
import StreamStatusTab from "./StreamStatusTab/StreamStatusTab.jsx";
import styles from "./VideoStream.module.scss";

export default function VideoStream({ className, userID }) {
  const [status, setCurrentStatus] = useState("OFFLINE");
  const [ingest, setCurrentIngest] = useState("");

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  useStreamer(videoRef, ingest);

  const classes = [className, styles.videoStream].filter(Boolean).join(" ");

  const handleOnStreamEvent = (streamData) => {
    setCurrentStatus(streamData.status);
    setCurrentIngest(streamData.ingest);
  };

  useEffect(() => {
    socket.emit("get-stream-data", userID);
    socket.on("get-stream-data", (streamData) =>
      handleOnStreamEvent(streamData)
    );

    return () => socket.off("stream");
  }, [status, ingest]);

  return (
    <div
      ref={containerRef}
      className={classes}>
      <video
        ref={videoRef}
        className={styles.video}
        autoPlay
        muted
      />

      <StreamStatusTab status={status} />

      <Controls
        videoRef={videoRef}
        status={status}
        containerRef={containerRef}
      />
    </div>
  );
}

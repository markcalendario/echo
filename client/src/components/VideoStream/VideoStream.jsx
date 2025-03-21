import useStreamer from "@/hooks/useStreamer.jsx";
import socket from "@/utils/socket.io.js";
import { useEffect, useRef, useState } from "react";
import { Controls } from "./Controls/Controls.jsx";
import StreamStatusTab from "./StreamStatusTab/StreamStatusTab.jsx";
import styles from "./VideoStream.module.scss";

export default function VideoStream({ className, streamerID }) {
  const [status, setCurrentStatus] = useState("OFFLINE");
  const [hlsPlayback, setHLSPlayback] = useState("");

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  useStreamer(videoRef, hlsPlayback);

  const classes = [className, styles.videoStream].filter(Boolean).join(" ");

  const handleOnStreamEvent = (streamData) => {
    setCurrentStatus(streamData.status);
    setHLSPlayback(streamData.hlsPlayback);
  };

  useEffect(() => {
    socket.emit("get-stream-data", streamerID);
    socket.on("get-stream-data", (streamData) =>
      handleOnStreamEvent(streamData)
    );

    return () => socket.off("stream");
  }, [status, hlsPlayback]);

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

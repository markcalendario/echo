import useStreamer from "@/hooks/useStreamer.jsx";
import { useEffect, useRef, useState } from "react";
import { Controls } from "./Controls/Controls.jsx";
import StreamStatusTab from "./StreamStatusTab/StreamStatusTab.jsx";
import styles from "./VideoStream.module.scss";

export default function VideoStream({
  className,
  userID,
  status: initialStatus,
  ingest: initialIngest
}) {
  const [currentStatus, setCurrentStatus] = useState(initialStatus);
  const [currentIngest, setCurrentIngest] = useState(initialIngest);

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  useStreamer(videoRef, currentIngest);

  const classes = [className, styles.videoStream].filter(Boolean).join(" ");

  useEffect(() => {
    setTimeout(() => {
      setCurrentStatus("LIVE");
      setCurrentIngest("https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8");
    }, 3000);
  }, []);

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

      <StreamStatusTab status={currentStatus} />

      <Controls
        videoRef={videoRef}
        status={currentStatus}
        containerRef={containerRef}
      />
    </div>
  );
}

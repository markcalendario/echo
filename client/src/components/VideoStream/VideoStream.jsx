import useStreamer from "@/hooks/useStreamer.jsx";
import { useRef } from "react";
import { Controls } from "./Controls/Controls.jsx";
import StreamStatusTab from "./StreamStatusTab/StreamStatusTab.jsx";
import styles from "./VideoStream.module.scss";

export default function VideoStream({ className, status, hlsPlayback }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  useStreamer(videoRef, hlsPlayback);

  const classes = [className, styles.videoStream].filter(Boolean).join(" ");

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

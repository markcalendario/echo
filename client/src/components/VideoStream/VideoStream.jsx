import useStreamer from "@/hooks/useStreamer.jsx";
import { useRef } from "react";
import { Controls } from "./Controls/Controls.jsx";
import styles from "./VideoStream.module.scss";

export default function VideoStream({ className }) {
  const classes = [className, styles.videoStream].join(" ");

  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useStreamer(videoRef, "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8");

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

      <Controls
        videoRef={videoRef}
        containerRef={containerRef}
      />
    </div>
  );
}

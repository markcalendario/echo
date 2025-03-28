import useStreamer from "@/hooks/useStreamer.jsx";
import { useRef } from "react";
import { Controls } from "./Controls/Controls.jsx";
import StreamStatusTab from "./StreamStatusTab/StreamStatusTab.jsx";
import styles from "./VideoStream.module.scss";

export default function VideoStream({
  status,
  className,
  hlsPlayback,
  hideControls
}) {
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

      {!hideControls && (
        <Controls
          className={styles.controls}
          status={status}
          videoRef={videoRef}
          containerRef={containerRef}
        />
      )}
    </div>
  );
}

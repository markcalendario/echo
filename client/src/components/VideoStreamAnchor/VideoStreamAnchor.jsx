import VideoStream from "../VideoStream/VideoStream.jsx";
import styles from "./VideoStreamAnchor.module.scss";

export default function VideoStreamAnchor({
  to,
  status,
  className,
  hlsPlayback
}) {
  const classes = [className, styles.vsAnchor].filter(Boolean).join(" ");
  return (
    <a
      href={to}
      className={classes}>
      <VideoStream
        status={status}
        hideControls={true}
        hlsPlayback={hlsPlayback}
      />
    </a>
  );
}

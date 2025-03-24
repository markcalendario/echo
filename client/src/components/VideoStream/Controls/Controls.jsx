import useFullscreen from "@/hooks/useFullscreen.jsx";
import usePlayPause from "@/hooks/usePlayPause.jsx";
import useVolume from "@/hooks/useVolume.jsx";
import Range from "../../Range/Range.jsx";
import styles from "./Controls.module.scss";

export function Controls({ className, videoRef, containerRef, status }) {
  const classes = [styles.controls, className].filter(Boolean).join(" ");

  const [isPlaying, togglePlayPause] = usePlayPause(videoRef);
  const [isMuted, volume, toggleMute, changeVolume] = useVolume(videoRef);
  const [isFullscreen, expand, shrink] = useFullscreen(containerRef);

  if (status === "OFFLINE") return;

  return (
    <div className={classes}>
      <div className={styles.controlGroup}>
        <PlaybackButton
          isPlaying={isPlaying}
          togglePlayPause={togglePlayPause}
        />
        <SpeakerButton
          isMuted={isMuted}
          volume={volume}
          toggleMute={toggleMute}
        />
        <Range
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={changeVolume}
          disabled={isMuted}
        />
      </div>

      <div className={styles.controlGroup}>
        <FullscreenButton
          isFullscreen={isFullscreen}
          enterFullscreen={expand}
          exitFullscreen={shrink}
        />
      </div>
    </div>
  );
}

function PlaybackButton({ isPlaying, togglePlayPause }) {
  return (
    <button onClick={togglePlayPause}>
      <i className={`fas ${isPlaying ? "fa-square" : "fa-play"} fa-fw`} />
    </button>
  );
}

function SpeakerButton({ isMuted, volume, toggleMute }) {
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return "fa-volume-xmark";
    return volume <= 0.5 ? "fa-volume-low" : "fa-volume-high";
  };

  return (
    <button onClick={toggleMute}>
      <i className={`fas ${getVolumeIcon()} fa-fw`} />
    </button>
  );
}

function FullscreenButton({ isFullscreen, enterFullscreen, exitFullscreen }) {
  return (
    <button onClick={isFullscreen ? exitFullscreen : enterFullscreen}>
      <i
        className={`fas ${isFullscreen ? "fa-compress" : "fa-expand"} fa-fw`}
      />
    </button>
  );
}

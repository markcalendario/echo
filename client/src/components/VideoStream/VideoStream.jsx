import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";
import Range from "../Range/Range.jsx";
import styles from "./VideoStream.module.scss";

export default function VideoStream({ className }) {
  const classes = [className, styles.videoStream].join(" ");
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // State for play/pause, mute, volume, and fullscreen
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (videoRef.current && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource("https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8");
      hls.attachMedia(videoRef.current);
    } else if (videoRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = "https://example.com/stream.m3u8";
    }

    // Detect fullscreen changes
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const enterFullscreen = () => {
    if (!containerRef.current) return;
    if (containerRef.current.requestFullscreen) {
      containerRef.current.requestFullscreen();
    } else if (containerRef.current.webkitRequestFullscreen) {
      containerRef.current.webkitRequestFullscreen();
    } else if (containerRef.current.mozRequestFullScreen) {
      containerRef.current.mozRequestFullScreen();
    } else if (containerRef.current.msRequestFullscreen) {
      containerRef.current.msRequestFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

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
        isPlaying={isPlaying}
        isMuted={isMuted}
        volume={volume}
        togglePlayPause={togglePlayPause}
        toggleMute={toggleMute}
        handleVolumeChange={handleVolumeChange}
        enterFullscreen={enterFullscreen}
        exitFullscreen={exitFullscreen}
        isFullscreen={isFullscreen}
      />
    </div>
  );
}

function Controls({
  isPlaying,
  isMuted,
  volume,
  togglePlayPause,
  toggleMute,
  handleVolumeChange,
  enterFullscreen,
  exitFullscreen,
  isFullscreen
}) {
  return (
    <div className={styles.controls}>
      <div className={styles.controlGroup}>
        {/* Play/Pause Button */}
        <button onClick={togglePlayPause}>
          <i className={`fas ${isPlaying ? "fa-pause" : "fa-play"} fa-fw`} />
        </button>

        {/* Mute/Unmute Button */}
        <button onClick={toggleMute}>
          <i
            className={`fas ${
              volume === 0 || isMuted
                ? "fa-volume-xmark"
                : volume < 0.5
                ? "fa-volume-low"
                : "fa-volume-high"
            } fa-fw`}
          />
        </button>

        {/* Volume Slider */}
        <div className={styles.volumeControl}>
          <Range
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            disabled={isMuted}
          />
        </div>
      </div>

      {/* Fullscreen Controls */}
      <div className={styles.controlGroup}>
        {isFullscreen ? (
          <button onClick={exitFullscreen}>
            <i className="fas fa-compress fa-fw" /> {/* Shrink Button */}
          </button>
        ) : (
          <button onClick={enterFullscreen}>
            <i className="fas fa-expand fa-fw" /> {/* Expand Button */}
          </button>
        )}
      </div>
    </div>
  );
}

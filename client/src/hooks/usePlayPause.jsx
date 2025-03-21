import { useState } from "react";

export default function usePlayPause(videoRef) {
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) video.pause();
    else video.play();

    setIsPlaying((prev) => !prev);
  };

  return [isPlaying, togglePlayPause];
}

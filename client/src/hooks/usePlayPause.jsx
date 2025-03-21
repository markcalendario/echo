import { useEffect, useState } from "react";

export default function usePlayPause(videoRef) {
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isPlaying) video.play();
    else video.pause();
  }, [isPlaying]);

  return [isPlaying, togglePlayPause];
}

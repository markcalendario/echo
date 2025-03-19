import { useEffect, useState } from "react";

export default function useVolume(videoRef) {
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);

  const handleMuteToggle = () => setIsMuted(!isMuted);

  const handleVolumeChange = (evt) => {
    const newVolume = evt.target.value;
    setVolume(newVolume);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = volume;
  }, [volume]);

  return [isMuted, volume, handleMuteToggle, handleVolumeChange];
}

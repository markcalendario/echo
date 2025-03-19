import Hls from "hls.js";
import { useEffect } from "react";

export default function useStreamer(videoRef, streamUrl) {
  const playStream = () => {
    if (videoRef.current && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(videoRef.current);
    } else if (videoRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = streamUrl;
    }
  };

  useEffect(() => {
    playStream();
  }, [videoRef, streamUrl]);
}

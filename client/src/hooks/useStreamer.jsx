import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";

export default function useStreamer(videoRef, streamUrl) {
  const [isLive, setIsLive] = useState(false);
  const hlsRef = useRef(null);

  const playStream = () => {
    if (!videoRef.current) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(videoRef.current);
      hlsRef.current = hls;
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = streamUrl;
    }
  };

  const isStreamLive = async () => {
    try {
      const response = await fetch(streamUrl, { method: "HEAD" });
      return response.ok;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    let timeout;

    const checkLiveStream = async () => {
      const live = await isStreamLive();
      setIsLive(live);
    };

    checkLiveStream();
    timeout = setInterval(checkLiveStream, 5000);

    return () => clearInterval(timeout);
  }, [streamUrl]);

  useEffect(() => {
    if (isLive) playStream();

    return () => {
      if (hlsRef.current) hlsRef.current.destroy();
    };
  }, [isLive, streamUrl]);
}

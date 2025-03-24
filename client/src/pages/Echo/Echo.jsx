import VideoStream from "@/components/VideoStream/VideoStream.jsx";
import Dashboard from "@/layouts/Dashboard/Dashboard.jsx";
import FluidContent from "@/layouts/Dashboard/FluidContent/FluidContent.jsx";
import SignedInRoute from "@/route-protections/SignedInRoute.jsx";
import socket from "@/utils/socket.io.js";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Me.module.scss";

export default function Echo() {
  return (
    <SignedInRoute unauthorizedPath="/">
      <Dashboard>
        <StreamPreview />
      </Dashboard>
    </SignedInRoute>
  );
}

function StreamPreview() {
  const { streamerID } = useParams();
  const navigate = useNavigate();
  const [streamData, setStreamData] = useState(null);

  useEffect(() => {
    if (!streamerID) {
      navigate("/browse");
      return;
    }

    socket.emit("get-stream-data", streamerID);
    socket.on("get-stream-data", (streamData) => setStreamData(streamData));

    return () => socket.off("stream");
  }, [streamerID]);

  if (streamData === null) return;

  return (
    <FluidContent contentClassName={styles.preview}>
      <VideoStream
        status={streamData.status}
        className={styles.videoStream}
        hlsPlayback={streamData.hlsPlayback}
      />
    </FluidContent>
  );
}

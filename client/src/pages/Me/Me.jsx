import Button from "@/components/Button/Button.jsx";
import Input from "@/components/Input/Input.jsx";
import VideoStream from "@/components/VideoStream/VideoStream.jsx";
import Content from "@/layouts/Dashboard/Content/Content.jsx";
import Dashboard from "@/layouts/Dashboard/Dashboard.jsx";
import SignedInRoute from "@/route-protections/SignedInRoute.jsx";
import fetchAPI from "@/utils/fetch.js";
import socket from "@/utils/socket.io.js";
import { showErrorToast, showSuccessToast } from "@/utils/toast.js";
import { Fragment, useEffect, useState } from "react";
import styles from "./Me.module.scss";

export default function Me() {
  return (
    <SignedInRoute unauthorizedPath="/">
      <Dashboard>
        <MyStream />
      </Dashboard>
    </SignedInRoute>
  );
}

function MyStream() {
  const [userID, setUserID] = useState(null);
  const [streamData, setStreamData] = useState({
    status: null,
    hlsPlayback: null
  });

  const fetchMyStream = async () => {
    const config = { method: "GET", credentials: "include" };
    const response = await fetchAPI("/users/id", config);

    setUserID(response.userID);
  };

  useEffect(() => {
    fetchMyStream();
  }, []);

  useEffect(() => {
    socket.emit("get-stream-data", userID);
    socket.on("get-stream-data", (streamData) => setStreamData(streamData));

    return () => socket.off("stream");
  }, [userID]);

  if (userID === null) return;

  return (
    <Fragment>
      <Content className={styles.myStream}>
        <VideoStream
          status={streamData.status}
          className={styles.videoStream}
          hlsPlayback={streamData.hlsPlayback}
        />
      </Content>

      <StreamManager />
    </Fragment>
  );
}

function StreamManager() {
  const [streamKey, setStreamKey] = useState("");

  const getStreamKey = async () => {
    const config = { method: "GET", credentials: "include" };
    const response = await fetchAPI("/streams/stream-key", config);

    if (!response.success) return showErrorToast(response.message);
    setStreamKey(response.key);
    showSuccessToast(response.message);
  };

  return (
    <Content
      title="Stream Manager"
      className={styles.streamManager}>
      <Input
        placeholder="Ingest URL"
        value={import.meta.env.VITE_INGEST_URL}
        disabled
      />
      <Input
        placeholder="Stream Key"
        value={streamKey}
        disabled
      />
      <Button
        type="button"
        onClick={getStreamKey}>
        Generate Stream Key
      </Button>
    </Content>
  );
}

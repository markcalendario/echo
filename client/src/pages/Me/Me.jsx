import Button from "@/components/Button/Button.jsx";
import Input from "@/components/Input/Input.jsx";
import VideoStream from "@/components/VideoStream/VideoStream.jsx";
import Content from "@/layouts/Dashboard/Content/Content.jsx";
import Dashboard from "@/layouts/Dashboard/Dashboard.jsx";
import SignedInRoute from "@/route-protections/SignedInRoute.jsx";
import { Fragment } from "react";
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
  return (
    <Fragment>
      <Content className={styles.myStream}>
        <VideoStream
          className={styles.videoStream}
          status="live"
        />
      </Content>

      <StreamManager />
    </Fragment>
  );
}

function StreamManager() {
  return (
    <Content
      title="Stream Manager"
      className={styles.streamManager}>
      <form>
        <Input
          placeholder="Ingest URL"
          value={import.meta.env.VITE_INGEST_URL}
          disabled
        />
        <Input
          placeholder="Stream Key"
          disabled
        />
        <Button>Generate Stream Key</Button>
      </form>
    </Content>
  );
}

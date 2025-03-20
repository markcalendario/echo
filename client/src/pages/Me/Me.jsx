import VideoStream from "@/components/VideoStream/VideoStream.jsx";
import Content from "@/layouts/Dashboard/Content/Content.jsx";
import Dashboard from "@/layouts/Dashboard/Dashboard.jsx";
import SignedInRoute from "@/route-protections/SignedInRoute.jsx";
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
    <Content className={styles.myStream}>
      <VideoStream
        className={styles.videoStream}
        status="live"
      />
    </Content>
  );
}

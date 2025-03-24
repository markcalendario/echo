import EmptySection from "@/components/EmptySection/EmptySection.jsx";
import VideoStreamAnchor from "@/components/VideoStreamAnchor/VideoStreamAnchor.jsx";
import Content from "@/layouts/Dashboard/Content/Content.jsx";
import Dashboard from "@/layouts/Dashboard/Dashboard.jsx";
import SignedInRoute from "@/route-protections/SignedInRoute.jsx";
import fetchAPI from "@/utils/fetch.js";
import { useEffect, useState } from "react";
import styles from "./Browse.module.scss";

export default function BrowsePage() {
  return (
    <SignedInRoute unauthorizedPath="/">
      <Dashboard>
        <Browse />
      </Dashboard>
    </SignedInRoute>
  );
}

function Browse() {
  const [echoes, setEchoes] = useState([]);

  const getActiveStreams = async () => {
    const config = { credentials: "include" };
    const response = await fetchAPI("/streams/live", config);
    setEchoes(response.liveStreams);
  };

  useEffect(() => {
    getActiveStreams();
  }, []);

  return (
    <Content
      title="Live Echoes"
      className={styles.echoes}>
      {echoes.length === 0 && <EmptySection />}
      {echoes.map((echo) => (
        <VideoStreamAnchor
          status={echo.status}
          to={echo.streamerID}
          key={echo.streamerID}
          className={styles.stream}
          hlsPlayback={echo.hlsPlayback}
        />
      ))}
    </Content>
  );
}

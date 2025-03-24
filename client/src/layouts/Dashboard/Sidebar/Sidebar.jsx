import EmptySection from "@/components/EmptySection/EmptySection.jsx";
import fetchAPI from "@/utils/fetch.js";
import { useEffect, useState } from "react";
import styles from "./Sidebar.module.scss";

export default function Sidebar() {
  const navItems = [
    { icon: "fas fa-satellite-dish", text: "Browse", link: "/browse" },
    { icon: "fas fa-circle-nodes", text: "Me", link: "/me" }
  ];

  const initializeDisplay = () => {
    const sidebar = document.getElementById("sidebar");
    const screenWidth = window.innerWidth;
    if (screenWidth > 768) sidebar.style.display = "block";
  };

  useEffect(() => {
    initializeDisplay();
    window.addEventListener("resize", initializeDisplay);
    return () => window.removeEventListener("resize", initializeDisplay);
  }, []);

  return (
    <aside
      id="sidebar"
      className={styles.sidebar}>
      {navItems.map(({ icon, text, link }, index) => (
        <a
          key={index}
          href={link}
          className={styles.sidebarItem}>
          <i className={icon}></i>
          <span>{text}</span>
        </a>
      ))}

      <h1>Live Streamers</h1>
      <LiveStreamerList />
    </aside>
  );
}

function LiveStreamerList() {
  const [liveStreamers, setLiveStreamers] = useState([]);

  const fetchLiveStreamers = async () => {
    const config = { credentials: "include" };
    const response = await fetchAPI("/streams/live-streamers", config);
    console.log(response);

    setLiveStreamers(response.liveStreamers);
  };

  useEffect(() => {
    fetchLiveStreamers();
  }, []);

  if (!liveStreamers.length) return <EmptySection />;

  return (
    <div className={styles.liveStreamers}>
      {liveStreamers.map((streamer, index) => (
        <LiveStreamer
          key={index}
          {...streamer}
        />
      ))}
    </div>
  );
}

function LiveStreamer({ streamerID, username }) {
  return (
    <a
      href={`/echo/${streamerID}`}
      className={styles.liveStreamer}>
      <img
        src={`/assets/images/misc/default-profile.jpg`}
        alt={`${username}`}
      />
      <div className={styles.details}>
        <span className={styles.userName}>{username}</span>
      </div>
    </a>
  );
}

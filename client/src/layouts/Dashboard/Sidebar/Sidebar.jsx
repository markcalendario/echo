import { useEffect, useState } from "react";
import styles from "./Sidebar.module.scss";

export default function Sidebar() {
  const navItems = [
    { icon: "fas fa-satellite-dish", text: "Browse", link: "#" },
    { icon: "fas fa-circle-nodes", text: "Me", link: "#" }
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

      <h1>Live Channels</h1>
      <LiveChannelList />
    </aside>
  );
}

function LiveChannelList() {
  const [liveChannels, setLiveChannels] = useState([]);

  const fetchLiveChannels = async () => {
    const request = await fetch("https://randomuser.me/api?results=5&nat=us");
    const { results } = await request.json();

    const data = results.map((value, faw) => {
      return {
        userName: value.login.username,
        avatar: value.picture.thumbnail
      };
    });

    setLiveChannels(data);
    console.log(data);
  };

  useEffect(() => {
    fetchLiveChannels();
  }, []);

  if (!liveChannels.length) return null;

  return (
    <div className={styles.liveChannels}>
      {liveChannels.map((channel, index) => (
        <LiveChannel
          key={index}
          {...channel}
        />
      ))}
    </div>
  );
}

function LiveChannel({ avatar, userName }) {
  return (
    <a
      href={`/${userName}`}
      className={styles.liveChannel}>
      <img
        src={avatar}
        alt={`${userName} avatar`}
      />
      <div className={styles.details}>
        <span className={styles.userName}>{userName}</span>
        <span className={styles.streamTag}>Valorant</span>
      </div>
    </a>
  );
}

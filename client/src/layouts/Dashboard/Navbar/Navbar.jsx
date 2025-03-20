import fetchAPI from "@/utils/fetch.js";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <LeftContent />
          <RightContent />
        </div>
      </div>
    </nav>
  );
}

function LeftContent() {
  return (
    <div className={styles.left}>
      <a
        href="/"
        className={styles.logo}>
        <img
          src="/assets/logo/primary.svg"
          alt="Echo Logo"
        />
        <span>Echo</span>
      </a>
    </div>
  );
}

function RightContent() {
  const [username, setUsername] = useState("");

  const handleToggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    const display = sidebar.style.display || null;

    if (display === "none" || !display) {
      sidebar.style.display = "block";
    } else {
      sidebar.style.display = "none";
    }
  };

  const fetchUsername = async () => {
    const config = { credentials: "include" };
    const response = await fetchAPI("/users/username", config);
    setUsername(response.username);
  };

  useEffect(() => {
    fetchUsername();
  }, []);

  if (!username) return;

  return (
    <div className={styles.right}>
      <div className={styles.user}>
        <img
          src="/assets/images/misc/default-profile.jpg"
          alt="User Avatar"
        />
        <a>{username}</a>
      </div>

      <button
        aria-label="Toggle menu"
        className={styles.burger}
        onClick={handleToggleSidebar}>
        <i className="fas fa-bars" />
      </button>
    </div>
  );
}

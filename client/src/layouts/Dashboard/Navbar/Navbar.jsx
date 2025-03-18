import styles from "./Navbar.module.scss";

export default function Navbar() {
  const handleToggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    const display = sidebar.style.display || null;

    if (display === "none" || !display) {
      sidebar.style.display = "block";
    } else {
      sidebar.style.display = "none";
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <a
            href="/"
            className={styles.logo}>
            <img
              src="/assets/logo/primary.svg"
              alt="Echo Logo"
            />
            <span>Echo</span>
          </a>

          <div className={styles.right}>
            <div className={styles.user}>
              <img
                src="/assets/images/misc/default-profile.jpg"
                alt="User Avatar"
              />
              <a>kenesu00</a>
            </div>

            <button
              aria-label="Toggle menu"
              className={styles.burger}
              onClick={handleToggleSidebar}>
              <i className="fas fa-bars" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

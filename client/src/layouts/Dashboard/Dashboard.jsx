import styles from "./Dashboard.module.scss";
import Main from "./Main/Main.jsx";
import Navbar from "./Navbar/Navbar.jsx";
import Sidebar from "./Sidebar/Sidebar.jsx";

export default function Dashboard({ children }) {
  return (
    <div className={styles.dashboard}>
      <Navbar />
      <Sidebar />
      <Main>{children}</Main>
    </div>
  );
}

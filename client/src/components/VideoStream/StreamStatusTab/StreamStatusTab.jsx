import styles from "./StreamStatusTab.module.scss";

export default function StreamStatusTab({ status }) {
  return (
    <div className={styles.tab}>
      <div className={styles[status]}>{status}</div>
    </div>
  );
}

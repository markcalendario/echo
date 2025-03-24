import styles from "./EmptySection.module.scss";

export default function EmptySection() {
  return (
    <div className={styles.empty}>
      <img
        src="/assets/abstracts/echo-eyes.svg"
        alt="empty"
      />
      <p className={styles.title}>Weird Silence</p>
      <p>Nothing to show here.</p>
    </div>
  );
}

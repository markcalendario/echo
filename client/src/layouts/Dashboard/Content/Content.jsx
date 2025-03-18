import styles from "./Content.module.scss";

export default function Content({ title, description, children }) {
  return (
    <div className={styles.content}>
      {(title || description) && (
        <div className={styles.header}>
          {title && <h1>{title}</h1>}
          {description && <p>{description}</p>}
        </div>
      )}

      <div className={styles.wrapper}>{children}</div>
    </div>
  );
}

import styles from "./Content.module.scss";

export default function Content({
  id,
  className,
  title,
  description,
  children
}) {
  const classes = [className, styles.content].filter(Boolean).join(" ");

  return (
    <div
      id={id}
      className={classes}>
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

import styles from "./Content.module.scss";

export default function Content({
  id,
  title,
  children,
  className,
  description
}) {
  const classes = [className, styles.wrapper].filter(Boolean).join(" ");

  return (
    <div
      id={id}
      className={styles.content}>
      {(title || description) && (
        <div className={styles.header}>
          {title && <h1>{title}</h1>}
          {description && <p>{description}</p>}
        </div>
      )}

      <div className={classes}>{children}</div>
    </div>
  );
}

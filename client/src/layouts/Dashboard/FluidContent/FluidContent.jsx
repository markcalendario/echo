import styles from "./FluidContent.module.scss";

export default function FluidContent({
  id,
  title,
  children,
  contentClassName,
  wrapperClassName,
  description
}) {
  const wrapperClasses = [wrapperClassName, styles.wrapper]
    .filter(Boolean)
    .join(" ");

  const contentClasses = [contentClassName, styles.fluidContent]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      id={id}
      className={contentClasses}>
      {(title || description) && (
        <div className={styles.header}>
          {title && <h1>{title}</h1>}
          {description && <p>{description}</p>}
        </div>
      )}

      <div className={wrapperClasses}>{children}</div>
    </div>
  );
}

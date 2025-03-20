import styles from "./Button.module.scss";

export default function Button({ className, id, onClick, children, type }) {
  const classes = [className, styles.button].filter(Boolean).join(" ");

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      className={classes}>
      {children}
    </button>
  );
}

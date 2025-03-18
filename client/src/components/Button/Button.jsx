import styles from "./Button.module.scss";

export default function Button({ className, id, onClick, children }) {
  const classes = [className, styles.button].join(" ");

  return (
    <button
      id={id}
      onClick={onClick}
      className={classes}>
      {children}
    </button>
  );
}

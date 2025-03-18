import styles from "./Range.module.scss";

export default function Range({ min, max, step, value, onChange, disabled }) {
  return (
    <input
      className={styles.range}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
}

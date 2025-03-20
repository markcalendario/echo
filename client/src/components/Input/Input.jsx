import styles from "./Input.module.scss";

export default function Input({
  id,
  placeholder,
  value,
  name,
  type,
  onChange
}) {
  return (
    <div className={styles.input}>
      <label htmlFor={id}>{placeholder}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={styles.input}
        placeholder={placeholder}
      />
    </div>
  );
}

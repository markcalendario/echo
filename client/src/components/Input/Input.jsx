import styles from "./Input.module.scss";

export default function Input({ id, placeholder, value, name, type }) {
  return (
    <div className={styles.input}>
      <label htmlFor={id}>{placeholder}</label>
      <input
        name={name}
        type={type}
        value={value}
        className={styles.input}
        placeholder={placeholder}
      />
    </div>
  );
}

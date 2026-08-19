import styles from "../auth.module.css";

export default function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button className={styles.primaryButton} type="submit">
      {children}
      <span aria-hidden="true">→</span>
    </button>
  );
}

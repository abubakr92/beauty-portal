import styles from "../auth.module.css";

type AuthCardProps = {
  children: React.ReactNode;
  title?: string;
  description?: React.ReactNode;
  variant?: "default" | "compact" | "signup";
};

export default function AuthCard({
  children,
  title,
  description,
  variant = "default",
}: AuthCardProps) {
  const variantClass =
    variant === "compact"
      ? styles.compactCard
      : variant === "signup"
        ? styles.signupCard
        : "";

  return (
    <article className={`${styles.card} ${variantClass}`}>
      {title && (
        <header className={styles.cardHeader}>
          <h1>{title}</h1>
          {description && <p>{description}</p>}
        </header>
      )}
      {children}
    </article>
  );
}

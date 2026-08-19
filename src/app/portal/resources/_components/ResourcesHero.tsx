import styles from "./ResourcesHero.module.css";

type ResourcesHeroProps = {
  compact?: boolean;
  eyebrow: string;
  title: React.ReactNode;
  description: React.ReactNode;
};

export default function ResourcesHero({ compact = false, eyebrow, title, description }: ResourcesHeroProps) {
  return (
    <section className={`${styles.hero}${compact ? ` ${styles.compact}` : ""}`}>
      <p>{eyebrow}</p>
      <h1>{title}</h1>
      <span>{description}</span>
    </section>
  );
}

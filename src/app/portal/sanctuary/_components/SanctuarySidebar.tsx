import Image from "next/image";
import Link from "next/link";
import { aboutSanctuary, activeSisters, trendingTopics } from "../data";
import styles from "./SanctuarySidebar.module.css";

type SanctuarySidebarProps = {
  compact?: boolean;
};

export default function SanctuarySidebar({ compact = false }: SanctuarySidebarProps) {
  return (
    <aside className={styles.sidebar} aria-label="Sanctuary information">
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>
          <Image src="/sanctuary/about-community.svg" alt="" width={24} height={24} />
          About the Sanctuary
        </h2>
        <p className={styles.aboutCopy}>
          A private, faith-focused community space built on trust, kindness, and mutual support for Muslim
          women.
        </p>
        <ul className={styles.aboutList}>
          {aboutSanctuary.map((item) => (
            <li key={item.label}>
              {item.icon === "kindness" ? (
                <span className={styles.kindnessIcon} aria-hidden="true">
                  ☺
                </span>
              ) : (
                <Image src={item.icon} alt="" width={22} height={22} />
              )}
              {item.label}
            </li>
          ))}
        </ul>
        <div className={styles.divider} aria-hidden="true">
          <span />
          <Image src="/sanctuary/lotus-divider.svg" alt="" width={25} height={18} />
          <span />
        </div>
        <Link className={styles.outlineButton} href="/portal/sanctuary#community-guidelines">
          View Community Guidelines
        </Link>
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>
          <Image src="/shared/icon-trending.svg" alt="" width={24} height={24} />
          Trending Topics
        </h2>
        <ul className={styles.topicList}>
          {trendingTopics.map((topic) => (
            <li key={topic.label}>
              <span>{topic.label}</span>
              <strong>{topic.count}</strong>
            </li>
          ))}
        </ul>
        <Link className={styles.textLink} href="/portal/sanctuary?view=trending">
          View All
        </Link>
      </section>

      {!compact && (
        <>
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>
              <Image src="/sanctuary/active-sisters.svg" alt="" width={24} height={24} />
              Active Sisters
            </h2>
            <div className={styles.avatarRow}>
              {activeSisters.map((sister) => (
                <Image
                  key={sister.name}
                  src={sister.avatar}
                  alt={sister.name}
                  title={sister.name}
                  width={48}
                  height={48}
                />
              ))}
              <span>23+</span>
            </div>
          </section>

          <blockquote className={styles.quoteCard}>
            <Image className={styles.quoteBackground} src="/sanctuary/quote-card.png" alt="" fill sizes="320px" />
            <Image className={styles.quoteMark} src="/sanctuary/quote-mark.svg" alt="" width={25} height={25} />
            <p>And whoever relies upon Allah — then He is sufficient for him.</p>
            <cite>Qur&apos;an 65:3</cite>
          </blockquote>
        </>
      )}
    </aside>
  );
}

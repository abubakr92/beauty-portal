"use client";

import Image from "next/image";
import Link from "next/link";
import { aboutSanctuary, popularDiscussions, trendingTopics } from "../data";
import styles from "./SanctuarySidebar.module.css";

type SanctuarySidebarProps = { compact?: boolean };

export default function SanctuarySidebar({ compact = false }: SanctuarySidebarProps) {
  return (
    <aside className={styles.sidebar} aria-label="Sanctuary information">
      <section className={styles.card} id="community-guidelines">
        <h2 className={styles.cardTitle}><Image src="/sanctuary/about-community.svg" alt="" width={24} height={24} />{compact ? "Posting in Sanctuary" : "About Sanctuary"}</h2>
        <p className={styles.aboutCopy}>{compact ? "Share thoughtfully in this private, community-moderated space." : "A private space for honest conversations, thoughtful support, and meaningful connection between Muslim women."}</p>
        <ul className={styles.aboutList}>{aboutSanctuary.map((item) => <li key={item.label}>{item.icon === "kindness" ? <span className={styles.kindnessIcon} aria-hidden="true">✓</span> : <Image src={item.icon} alt="" width={22} height={22} />}{item.label}</li>)}</ul>
        <div className={styles.divider} aria-hidden="true"><span /><Image src="/sanctuary/lotus-divider.svg" alt="" width={25} height={18} /><span /></div>
        <Link className={styles.outlineButton} href="/portal/sanctuary#community-guidelines">View Community Guidelines</Link>
      </section>

      {!compact && <section className={styles.card}>
        <h2 className={styles.cardTitle}><Image src="/shared/icon-trending.svg" alt="" width={24} height={24} />Trending Topics</h2>
        <ul className={styles.topicList}>{trendingTopics.map((topic) => <li key={topic.label}><span>{topic.label}</span><strong>{topic.count}</strong></li>)}</ul>
        <button className={styles.textLink} onClick={() => window.dispatchEvent(new CustomEvent("sanctuary:trending"))} type="button">View All</button>
      </section>}

      {!compact && <section className={styles.card}>
        <h2 className={styles.cardTitle}><Image src="/sanctuary/active-sisters.svg" alt="" width={24} height={24} />Popular This Week</h2>
        <ol className={styles.popularList}>{popularDiscussions.map((discussion) => <li key={discussion.id}><Link href={`/portal/sanctuary/${discussion.id}`}>{discussion.title}</Link><span>{discussion.comments} comments</span></li>)}</ol>
      </section>}
    </aside>
  );
}

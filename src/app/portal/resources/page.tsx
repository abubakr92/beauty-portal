import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ResourcesHero from "./_components/ResourcesHero";
import {
  formatCounts,
  libraryResources,
  popularTopics,
  recentlyAdded,
  resourceTabs,
  scholarCollections,
} from "./data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Resource Library | Nothing But Beauty",
  description: "Explore lectures, workshops, PDFs, slides, and scholar collections shared by Muslim women.",
};

function Chevron() {
  return <span className={styles.chevron} aria-hidden="true" />;
}

function ResourceRow({ image }: { image: string }) {
  return (
    <article className={styles.resourceRow}>
      <Image className={styles.resourceImage} src={image} alt="" width={84} height={56} />
      <div className={styles.resourceTitle}>
        <strong>Tafsir Surah Al-Baqarah (1-10)</strong>
        <span>Dr. Aisha Waheed</span>
      </div>
      <p>A detailed study of Surah Al-Baqarah, covering the first 10 verses with depth and clarity.</p>
      <span className={styles.formatBadge}>Workshop</span>
      <span className={styles.topicBadge}>Quran</span>
      <time dateTime="2025-05-18">May 18,<br />2025</time>
      <span>English</span>
      <span className={styles.driveSource}>
        <Image src="/resources/google-drive.png" alt="Google Drive" width={25} height={25} />
        Drive<br />Folder
      </span>
      <a href="#" aria-label="Open resource in Google Drive">Open Drive <Image src="/resources/arrow-up-right.svg" alt="" width={8} height={8} /></a>
    </article>
  );
}

export default function ResourcesPage() {
  return (
    <main className={styles.page}>
      <ResourcesHero
        eyebrow="Knowledge . Preserved . Shared."
        title={<>Resource Library &amp;<br />Scholar Archives</>}
        description={<>A virtual library where women scholars organize and share their lectures,<br className={styles.desktopBreak} /> workshops, slides, PDFs, and audio recordings through their own external storage<br className={styles.desktopBreak} /> links for easy access and lasting benefit.</>}
      />

      <section className={styles.libraryShell} aria-label="Resource library">
        <div className={styles.notice}>
          <Image src="/shared/info.svg" alt="" width={24} height={24} />
          <p>This system hosted on external platforms such as Google Drive, Dropbox, or other external locations.</p>
        </div>

        <form className={styles.searchPanel} action="/portal/resources" method="get">
          <label className={styles.searchField}>
            <span className={styles.searchIcon} aria-hidden="true" />
            <span className={styles.visuallyHidden}>Search resources</span>
            <input name="query" type="search" placeholder="Search topics, scholars, keywords..." />
          </label>
          {[
            ["scholar", "Scholar"],
            ["topic", "Topic"],
            ["format", "Format"],
            ["language", "Language"],
            ["year", "Year"],
            ["collection", "Collections"],
          ].map(([name, label]) => (
            <label className={styles.selectField} key={name}>
              <span className={styles.visuallyHidden}>{label}</span>
              <select name={name} defaultValue=""><option value="">{label}</option></select>
            </label>
          ))}
          <button type="submit">Search <Image src="/resources/search.svg" alt="" width={20} height={20} /></button>
        </form>

        <div className={styles.libraryGrid}>
          <div className={styles.mainColumn}>
            <nav className={styles.tabs} aria-label="Resource formats">
              {resourceTabs.map((tab, index) => <a className={index === 0 ? styles.activeTab : undefined} href="#resource-list" key={tab}>{tab}</a>)}
            </nav>

            <section id="resource-list" className={styles.resourceList} aria-label="Resources">
              <div className={styles.tableHeader} aria-hidden="true">
                <span>Resources</span><span>Scholar</span><span>Details</span><span>Format</span><span>Topic</span><span>Date</span><span>Language</span><span>Source</span><span>Action</span>
              </div>
              <div className={styles.rows}>{libraryResources.map((resource) => <ResourceRow image={resource.image} key={resource.id} />)}</div>
            </section>

            <button className={styles.viewAll} type="button">View All Events <Chevron /></button>

            <section className={styles.collections} aria-labelledby="collections-title">
              <h2 id="collections-title">Featured Scholar Collections</h2>
              <div>
                {scholarCollections.map((image, index) => (
                  <article key={image}>
                    <Image src={image} alt="" fill sizes="(max-width: 700px) 100vw, 240px" />
                    <div>
                      <h3>Recently Added</h3>
                      <p>Qur&apos;an, Tafsir, References</p>
                    </div>
                    <a href="#resource-list">Explore Collection <Image src="/resources/arrow-up-right.svg" alt="" width={8} height={8} /></a>
                    <span className={styles.visuallyHidden}>Collection {index + 1}</span>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className={styles.sidebar} aria-label="Resource filters and highlights">
            <label className={styles.sortField}>
              <span className={styles.visuallyHidden}>Sort resources</span>
              <select defaultValue="newest"><option value="newest">Newest Added</option></select>
            </label>

            <section className={styles.sidebarCard}>
              <h2>Browse by Format</h2>
              <ul>{formatCounts.map(([label, count]) => <li key={label}><span>{label}</span><strong>{count}</strong></li>)}</ul>
              <a href="#resource-list">View All Categories</a>
            </section>

            <section className={styles.sidebarCard}>
              <h2>Popular Topics</h2>
              <div className={styles.topicCloud}>{popularTopics.map((topic) => <a href="#resource-list" key={topic}>{topic}</a>)}</div>
            </section>

            <section className={styles.sidebarCard}>
              <h2>Recently Added</h2>
              <ul className={styles.recentList}>{recentlyAdded.map(([title, meta]) => <li key={title}><strong>{title}</strong><span>{meta}</span></li>)}</ul>
            </section>
          </aside>
        </div>

        <section className={styles.submitBanner}>
          <Image src="/resources/archive-cta.webp" alt="" fill sizes="1352px" />
          <div>
            <h2>Featured Scholar Collections</h2>
            <p>Share your lectures, PDFs, workshops, and recordings with the community by linking your<br className={styles.desktopBreak} /> Google Drive, Dropbox, or external folders.</p>
          </div>
          <Link href="/portal/resources/submit">Submit Your Archive <Image src="/resources/arrow-up-right.svg" alt="" width={8} height={8} /></Link>
        </section>
      </section>
    </main>
  );
}

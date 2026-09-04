"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import ResourcesHero from "./_components/ResourcesHero";
import {
  formatCounts,
  type LibraryResource,
  libraryResources,
  popularTopics,
  recentlyAdded,
  resourceTabs,
  scholarCollections,
} from "./data";
import styles from "./page.module.css";

function Chevron() {
  return <span className={styles.chevron} aria-hidden="true" />;
}

function ResourceRow({ resource }: { resource: LibraryResource }) {
  return (
    <article className={styles.resourceRow}>
      <Image className={styles.resourceImage} src={resource.image} alt="" width={84} height={56} />
      <div className={styles.resourceTitle}>
        <strong>{resource.title}</strong>
        <span>{resource.scholar} · Theme: {resource.topic}</span>
      </div>
      <p>{resource.description}</p>
      <span className={styles.formatBadge}>{resource.format}</span>
      <time dateTime={resource.date}>{new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${resource.date}T00:00:00`))}</time>
      <span>{resource.language}</span>
      <span className={styles.driveSource}>
        <Image src="/resources/google-drive.png" alt="Google Drive" width={25} height={25} />
        Drive<br />Folder
      </span>
      <a href={resource.sourceUrl} target="_blank" rel="noreferrer" aria-label={`Open ${resource.title} in Google Drive`}>Open Drive <Image src="/resources/arrow-up-right.svg" alt="" width={8} height={8} /></a>
    </article>
  );
}

export default function ResourcesPage() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ scholar: "", topic: "", format: "", language: "", year: "", collection: "" });
  const [sort, setSort] = useState("newest");
  const [visibleCount, setVisibleCount] = useState(3);

  const filteredResources = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return libraryResources.filter((resource) => {
      const haystack = `${resource.title} ${resource.scholar} ${resource.description} ${resource.topic}`.toLowerCase();
      return (!normalizedQuery || haystack.includes(normalizedQuery))
        && (!filters.scholar || resource.scholar === filters.scholar)
        && (!filters.topic || resource.topic === filters.topic)
        && (!filters.format || resource.format === filters.format)
        && (!filters.language || resource.language === filters.language)
        && (!filters.year || resource.date.startsWith(filters.year))
        && (!filters.collection || resource.collection === filters.collection);
    }).sort((first, second) => sort === "oldest" ? first.date.localeCompare(second.date) : second.date.localeCompare(first.date));
  }, [filters, query, sort]);

  function updateFilter(name: keyof typeof filters, value: string) {
    setFilters((current) => ({ ...current, [name]: value }));
    setVisibleCount(3);
  }

  const filterOptions: Record<keyof typeof filters, string[]> = {
    scholar: [...new Set(libraryResources.map((resource) => resource.scholar))],
    topic: [...new Set(libraryResources.map((resource) => resource.topic))],
    format: [...new Set(libraryResources.map((resource) => resource.format))],
    language: [...new Set(libraryResources.map((resource) => resource.language))],
    year: [...new Set(libraryResources.map((resource) => resource.date.slice(0, 4)))],
    collection: [...new Set(libraryResources.map((resource) => resource.collection))],
  };

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
          <p>These resources are hosted on external platforms such as Google Drive, Dropbox, or other external locations.</p>
        </div>

        <form className={styles.searchPanel} onSubmit={(event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setVisibleCount(3); document.getElementById("resource-list")?.scrollIntoView({ behavior: "smooth" }); }}>
          <label className={styles.searchField}>
            <span className={styles.searchIcon} aria-hidden="true" />
            <span className={styles.visuallyHidden}>Search resources</span>
            <input name="query" onChange={(event) => setQuery(event.target.value)} value={query} type="search" placeholder="Search themes, scholars, keywords..." />
          </label>
          {[
            ["scholar", "Scholar"],
            ["topic", "Theme"],
            ["format", "Format"],
            ["language", "Language"],
            ["year", "Year"],
            ["collection", "Collections"],
          ].map(([name, label]) => (
            <label className={styles.selectField} key={name}>
              <span className={styles.visuallyHidden}>{label}</span>
              <select name={name} onChange={(event) => updateFilter(name as keyof typeof filters, event.target.value)} value={filters[name as keyof typeof filters]}><option value="">{label}</option>{filterOptions[name as keyof typeof filters].map((option) => <option key={option}>{option}</option>)}</select>
            </label>
          ))}
          <button type="submit">Search <Image src="/resources/search.svg" alt="" width={20} height={20} /></button>
        </form>

        <div className={styles.libraryGrid}>
          <div className={styles.mainColumn}>
            <section className={styles.collections} aria-labelledby="collections-title">
              <div className={styles.sectionLabel}>CURATED KNOWLEDGE</div>
              <h2 id="collections-title">Featured Scholar Collections</h2>
              <div>
                {scholarCollections.map((image, index) => (
                  <article key={image}>
                    <Image src={image} alt="" fill sizes="(max-width: 700px) 100vw, 240px" />
                    <div><h3>{libraryResources[index % libraryResources.length].scholar}</h3><p>{libraryResources[index % libraryResources.length].collection}</p></div>
                    <button onClick={() => { updateFilter("collection", libraryResources[index % libraryResources.length].collection); document.getElementById("resource-list")?.scrollIntoView({ behavior: "smooth" }); }} type="button">Explore Collection <Image src="/resources/arrow-up-right.svg" alt="" width={8} height={8} /></button>
                    <span className={styles.visuallyHidden}>Collection {index + 1}</span>
                  </article>
                ))}
              </div>
            </section>

            <nav className={styles.tabs} aria-label="Resource formats">
              {resourceTabs.map((tab) => <button aria-pressed={filters.format === tab} className={filters.format === tab ? styles.activeTab : undefined} onClick={() => updateFilter("format", filters.format === tab ? "" : tab)} type="button" key={tab}>{tab}</button>)}
            </nav>

            <section id="resource-list" className={styles.resourceList} aria-label="Resources">
              <div className={styles.tableHeader} aria-hidden="true">
                <span>Preview</span><span>Resource, Scholar &amp; Theme</span><span>Details</span><span>Format</span><span>Date</span><span>Language</span><span>Source</span><span>Action</span>
              </div>
              <div className={styles.rows}>{filteredResources.slice(0, visibleCount).map((resource) => <ResourceRow resource={resource} key={resource.id} />)}</div>
              {!filteredResources.length && <p className={styles.emptyResources}>No resources match the selected filters.</p>}
            </section>

            {visibleCount < filteredResources.length && <button className={styles.viewAll} onClick={() => setVisibleCount(filteredResources.length)} type="button">View All Resources <Chevron /></button>}

          </div>

          <aside className={styles.sidebar} aria-label="Resource filters and highlights">
            <label className={styles.sortField}>
              <span className={styles.visuallyHidden}>Sort resources</span>
              <select onChange={(event) => setSort(event.target.value)} value={sort}><option value="newest">Newest Added</option><option value="oldest">Oldest Added</option></select>
            </label>

            <section className={styles.sidebarCard}>
              <h2>Popular Themes</h2>
              <div className={styles.topicCloud}>{popularTopics.map((topic) => <button aria-pressed={filters.topic === topic} onClick={() => updateFilter("topic", topic)} type="button" key={topic}>{topic}</button>)}</div>
            </section>

            <section className={styles.sidebarCard}>
              <h2>Browse by Format</h2>
              <ul>{formatCounts.map(([label, count]) => <li key={label}><button aria-pressed={filters.format === label} onClick={() => updateFilter("format", label)} type="button"><span>{label}</span><strong>{count}</strong></button></li>)}</ul>
              <button className={styles.sidebarLink} onClick={() => updateFilter("format", "")} type="button">View All Formats</button>
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
            <h2>Share Your Scholar Archive</h2>
            <p>Share your lectures, PDFs, workshops, and recordings with the community by linking your<br className={styles.desktopBreak} /> Google Drive, Dropbox, or external folders.</p>
          </div>
          <Link href="/portal/resources/submit">Submit Your Archive <Image src="/resources/arrow-up-right.svg" alt="" width={8} height={8} /></Link>
        </section>
      </section>
    </main>
  );
}

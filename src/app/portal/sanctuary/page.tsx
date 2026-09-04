"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import SanctuarySidebar from "./_components/SanctuarySidebar";
import { pinnedPosts, sanctuaryCategories, sanctuaryPosts } from "./data";
import styles from "./page.module.css";

type EngagementIconProps = {
  kind: "heart" | "comment" | "bookmark";
};

function EngagementIcon({ kind }: EngagementIconProps) {
  if (kind === "heart") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
      </svg>
    );
  }

  if (kind === "bookmark") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 3h12v18l-6-4-6 4V3Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.5 9.5 0 0 1-3.8-.9L3 21l1.8-5.1A8.5 8.5 0 1 1 21 11.5Z" />
    </svg>
  );
}

function MoreButton({ open, onCopy, onToggle }: { open: boolean; onCopy: () => void; onToggle: () => void }) {
  return (
    <div className={styles.moreControl}>
      <button aria-expanded={open} className={styles.moreButton} onClick={onToggle} type="button" aria-label="More post options">
        <span />
        <span />
        <span />
      </button>
      {open && <div className={styles.postMenu}><button onClick={onCopy} type="button">Copy post link</button><button onClick={onToggle} type="button">Report post</button></div>}
    </div>
  );
}

export default function SanctuaryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState("latest");
  const [period, setPeriod] = useState("all-time");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [engagement, setEngagement] = useState(() => Object.fromEntries(sanctuaryPosts.map((post) => [post.id, { likes: post.likes, comments: post.comments, bookmarks: post.bookmarks, liked: false, saved: false }])));

  useEffect(() => {
    function showTrending() {
      setActiveCategory("all");
      setSort("popular");
      document.querySelector(`.${styles.filters}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    window.addEventListener("sanctuary:trending", showTrending);
    return () => window.removeEventListener("sanctuary:trending", showTrending);
  }, []);

  const visiblePosts = useMemo(() => {
    const categoryPosts = activeCategory === "all" ? sanctuaryPosts : sanctuaryPosts.filter((post) => post.categorySlug === activeCategory);
    const periodLimit = period === "today" ? 0 : period === "week" ? 7 : period === "month" ? 30 : Number.POSITIVE_INFINITY;
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = categoryPosts.filter((post) => post.daysAgo <= periodLimit && (!normalizedQuery || `${post.title} ${post.excerpt} ${post.category}`.toLowerCase().includes(normalizedQuery)));
    if (sort === "popular") return [...filtered].sort((first, second) => engagement[second.id].likes - engagement[first.id].likes);
    if (sort === "discussed") return [...filtered].sort((first, second) => engagement[second.id].comments - engagement[first.id].comments);
    return filtered;
  }, [activeCategory, engagement, period, query, sort]);

  function updateEngagement(postId: string, kind: "like" | "comment" | "bookmark") {
    setEngagement((current) => {
      const item = current[postId];
      if (kind === "comment") return { ...current, [postId]: { ...item, comments: item.comments + 1 } };
      if (kind === "like") return { ...current, [postId]: { ...item, liked: !item.liked, likes: item.likes + (item.liked ? -1 : 1) } };
      return { ...current, [postId]: { ...item, saved: !item.saved, bookmarks: item.bookmarks + (item.saved ? -1 : 1) } };
    });
  }

  function copyPostLink(postId: string) {
    void navigator.clipboard?.writeText(`${window.location.origin}/portal/sanctuary/${postId}`);
    setOpenMenu(null);
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <Image
          className={styles.floralCorner}
          src="/sanctuary/sanctuary-floral-corner.png"
          alt=""
          width={628}
          height={628}
          priority
        />

        <header className={styles.intro}>
          <div>
            <span className={styles.eyebrow}>REFLECT. CONNECT. BELONG.</span>
            <h1>Sanctuary</h1>
            <p>Where sisterhood finds a voice — a private space for honest conversations, shared experiences, thoughtful support, and meaningful connection.</p>
          </div>
          <Link className={styles.createButton} href="/portal/sanctuary/new-post">
            <span aria-hidden="true">＋</span>
            Start a Discussion
          </Link>
        </header>

        <label className={styles.searchBox}><span>Search Sanctuary</span><div><span aria-hidden="true">⌕</span><input onChange={(event) => setQuery(event.target.value)} placeholder="Search discussions, topics, or keywords..." type="search" value={query} /></div></label>

        <div className={styles.contentGrid}>
          <section className={styles.feedColumn} aria-label="Sanctuary discussions">
            <nav className={styles.categoryNav} aria-label="Discussion categories">
              {sanctuaryCategories.map((category) => (
                <button
                  aria-pressed={activeCategory === category.slug}
                  className={activeCategory === category.slug ? styles.activeCategory : undefined}
                  onClick={() => setActiveCategory(category.slug)}
                  type="button"
                  key={category.slug}
                >
                  <Image src={category.icon} alt="" width={20} height={20} />
                  <span>{category.label}</span>
                </button>
              ))}
            </nav>

            <section className={styles.pinnedSection} aria-labelledby="pinned-heading">
              <h2 id="pinned-heading">
                <Image src="/sanctuary/pinned.svg" alt="" width={18} height={18} />
                Pinned Discussions
              </h2>
              <div className={styles.pinnedList}>
                {pinnedPosts.map((post) => (
                  <article className={styles.pinnedPost} id={post.id} key={post.id}>
                    <Image className={styles.avatar} src={post.avatar} alt="" width={58} height={58} />
                    <div className={styles.pinnedCopy}>
                      <h3>{post.title}</h3>
                      <p>{post.description}</p>
                      <div className={styles.metaRow}>
                        <span>{post.author}</span>
                        <strong>{post.role}</strong>
                        <i aria-hidden="true" />
                        <time>{post.age}</time>
                        <i aria-hidden="true" />
                        <span className={styles.commentCount}>
                          <EngagementIcon kind="comment" />
                          {post.comments}
                        </span>
                      </div>
                    </div>
                    <Image className={styles.pinIcon} src="/sanctuary/pin.svg" alt="Pinned post" width={23} height={23} />
                    <MoreButton open={openMenu === post.id} onCopy={() => copyPostLink(post.id)} onToggle={() => setOpenMenu((current) => current === post.id ? null : post.id)} />
                  </article>
                ))}
              </div>
            </section>

            <div className={styles.feedHeading}><span>COMMUNITY CONVERSATIONS</span><h2>Latest Discussions</h2></div>

            <form className={styles.filters} aria-label="Filter discussions">
              <label>
                <span className={styles.srOnly}>Sort discussions</span>
                <select name="sort" onChange={(event) => setSort(event.target.value)} value={sort}>
                  <option value="latest">Newest</option>
                  <option value="popular">Best</option>
                  <option value="discussed">Most Discussed</option>
                </select>
              </label>
              <label>
                <span className={styles.srOnly}>Filter by time</span>
                <select name="period" onChange={(event) => setPeriod(event.target.value)} value={period}>
                  <option value="all-time">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </label>
            </form>

            <div className={styles.postList}>
              {(showAll ? visiblePosts : visiblePosts.slice(0, 2)).map((post) => (
                <article className={styles.discussionCard} id={post.id} key={post.id} data-period={period}>
                  <Image className={styles.postAvatar} src={post.avatar} alt="" width={58} height={58} />
                  <div className={styles.postBody}>
                    <div className={styles.authorRow}>
                      <strong>{post.author}</strong>
                      <i aria-hidden="true" />
                      <time>{post.age}</time>
                      <i aria-hidden="true" />
                      <span>in {post.category}</span>
                    </div>
                    <h2><Link href={`/portal/sanctuary/${post.id}`}>{post.title}</Link></h2>
                    <p>{post.excerpt}</p>
                    <div className={styles.engagementRow} aria-label="Post engagement">
                      <button aria-pressed={engagement[post.id].liked} onClick={() => updateEngagement(post.id, "like")} type="button">
                        <EngagementIcon kind="heart" />
                        {engagement[post.id].likes}
                      </button>
                      <i aria-hidden="true" />
                      <button onClick={() => updateEngagement(post.id, "comment")} type="button" aria-label={`Add a comment to ${post.title}`}>
                        <EngagementIcon kind="comment" />
                        {engagement[post.id].comments}
                      </button>
                      <i aria-hidden="true" />
                      <button aria-pressed={engagement[post.id].saved} onClick={() => updateEngagement(post.id, "bookmark")} type="button">
                        <EngagementIcon kind="bookmark" />
                        {engagement[post.id].bookmarks}
                      </button>
                    </div>
                  </div>
                  <div className={styles.postImage}>
                    <Image src={post.image} alt="" fill sizes="(max-width: 720px) 100vw, 250px" />
                  </div>
                  <MoreButton open={openMenu === post.id} onCopy={() => copyPostLink(post.id)} onToggle={() => setOpenMenu((current) => current === post.id ? null : post.id)} />
                </article>
              ))}
              {!visiblePosts.length && <p className={styles.emptyPosts}>No discussions are available in this category yet.</p>}
            </div>
            {visiblePosts.length > 2 && <button className={styles.loadMore} onClick={() => setShowAll((current) => !current)} type="button">{showAll ? "Show Fewer Discussions" : "Load More Discussions"}</button>}
          </section>

          <SanctuarySidebar />
        </div>
      </div>
    </main>
  );
}

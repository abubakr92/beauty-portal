import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SanctuarySidebar from "./_components/SanctuarySidebar";
import { pinnedPosts, sanctuaryCategories, sanctuaryPosts } from "./data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Sanctuary | Nothing But Beauty",
  description: "A private, faith-focused space for Muslim women to connect, share, learn, and grow.",
};

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

function MoreButton() {
  return (
    <button className={styles.moreButton} type="button" aria-label="More post options">
      <span />
      <span />
      <span />
    </button>
  );
}

export default function SanctuaryPage() {
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
            <h1>Sanctuary</h1>
            <p>A safe space to connect, share, learn, and grow together in faith and sisterhood.</p>
          </div>
          <Link className={styles.createButton} href="/portal/sanctuary/new-post">
            <span aria-hidden="true">＋</span>
            Create Post
          </Link>
        </header>

        <div className={styles.contentGrid}>
          <section className={styles.feedColumn} aria-label="Sanctuary discussions">
            <nav className={styles.categoryNav} aria-label="Discussion categories">
              {sanctuaryCategories.map((category, index) => (
                <Link
                  className={index === 0 ? styles.activeCategory : undefined}
                  href={index === 0 ? "/portal/sanctuary" : `/portal/sanctuary?category=${category.slug}`}
                  key={category.slug}
                >
                  <Image src={category.icon} alt="" width={20} height={20} />
                  <span>{category.label}</span>
                </Link>
              ))}
            </nav>

            <section className={styles.pinnedSection} aria-labelledby="pinned-heading">
              <h2 id="pinned-heading">
                <Image src="/sanctuary/pinned.svg" alt="" width={18} height={18} />
                Pinned by Admin
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
                    <MoreButton />
                  </article>
                ))}
              </div>
            </section>

            <form className={styles.filters} aria-label="Filter discussions">
              <label>
                <span className={styles.srOnly}>Sort discussions</span>
                <select name="sort" defaultValue="latest">
                  <option value="latest">Latest</option>
                  <option value="popular">Most Popular</option>
                  <option value="discussed">Most Discussed</option>
                </select>
              </label>
              <label>
                <span className={styles.srOnly}>Filter by category</span>
                <select name="category" defaultValue="all">
                  <option value="all">All Categories</option>
                  {sanctuaryCategories.slice(1).map((category) => (
                    <option key={category.slug} value={category.slug}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span className={styles.srOnly}>Filter by time</span>
                <select name="period" defaultValue="all-time">
                  <option value="all-time">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </label>
            </form>

            <div className={styles.postList}>
              {sanctuaryPosts.map((post) => (
                <article className={styles.discussionCard} key={post.id}>
                  <Image className={styles.postAvatar} src={post.avatar} alt="" width={58} height={58} />
                  <div className={styles.postBody}>
                    <div className={styles.authorRow}>
                      <strong>{post.author}</strong>
                      <i aria-hidden="true" />
                      <time>{post.age}</time>
                      <i aria-hidden="true" />
                      <span>in {post.category}</span>
                    </div>
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                    <div className={styles.engagementRow} aria-label="Post engagement">
                      <span>
                        <EngagementIcon kind="heart" />
                        {post.likes}
                      </span>
                      <i aria-hidden="true" />
                      <span>
                        <EngagementIcon kind="comment" />
                        {post.comments}
                      </span>
                      <i aria-hidden="true" />
                      <span>
                        <EngagementIcon kind="bookmark" />
                        {post.bookmarks}
                      </span>
                    </div>
                  </div>
                  <div className={styles.postImage}>
                    <Image src={post.image} alt="" fill sizes="(max-width: 720px) 100vw, 250px" />
                  </div>
                  <MoreButton />
                </article>
              ))}
            </div>
          </section>

          <SanctuarySidebar />
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import SanctuarySidebar from "../_components/SanctuarySidebar";
import { postTags, sanctuaryCategories } from "../data";
import AnonymousIdentity from "./AnonymousIdentity";
import PublishPostForm from "./PublishPostForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Start a Discussion | Nothing But Beauty",
  description: "Share a question, reflection, or experience with the Nothing But Beauty sisterhood.",
};

export default function NewSanctuaryPostPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <Image
          className={styles.floralCorner}
          src="/sanctuary/new-post-leaf.svg"
          alt=""
          width={256}
          height={318}
          priority
        />

        <header className={styles.intro}>
          <h1>Start a Discussion</h1>
          <p>Ask a question, share an experience, or begin a thoughtful conversation with the sisterhood.</p>
        </header>

        <div className={styles.contentGrid}>
          <PublishPostForm className={styles.formCard}>
            <label className={styles.field}>
              <span>Category</span>
              <select name="category" defaultValue="" required>
                <option value="" disabled>
                  Select Category
                </option>
                {sanctuaryCategories.slice(1).map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.label}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.field}>
              <span>Discussion Title</span>
              <input name="title" type="text" placeholder="What would you like to ask or talk about?" maxLength={160} required />
            </label>

            <label className={styles.field}>
              <span>Share More</span>
              <textarea
                name="body"
                placeholder="Share your question, experience, reflection, or context here..."
                rows={5}
                maxLength={4000}
                required
              />
            </label>

            <fieldset className={styles.tags}>
              <legend>Tags <small>(Optional)</small></legend>
              <div>
                {postTags.map((tag) => (
                  <label key={tag}>
                    <input type="checkbox" name="tags" value={tag.toLowerCase()} />
                    <span>{tag}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <AnonymousIdentity />

            <aside className={styles.reminder} aria-label="Community guidelines reminder">
              <strong>
                <span aria-hidden="true">▲</span>
                Before You Post
              </strong>
              <p>Keep discussions respectful, protect personal information, and avoid hate speech, harassment, misinformation, or requests for religious rulings. <a href="#community-guidelines">View Full Guidelines</a></p>
            </aside>

            <button className={styles.publishButton} type="submit">Post Discussion</button>
          </PublishPostForm>

          <SanctuarySidebar compact />
        </div>
      </div>
    </main>
  );
}

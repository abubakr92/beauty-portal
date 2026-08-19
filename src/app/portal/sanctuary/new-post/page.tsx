import type { Metadata } from "next";
import Image from "next/image";
import SanctuarySidebar from "../_components/SanctuarySidebar";
import { postTags, sanctuaryCategories } from "../data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "New Sanctuary Post | Nothing But Beauty",
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
          <h1>New Post</h1>
          <p>Share with the sisterhood</p>
        </header>

        <div className={styles.contentGrid}>
          <form className={styles.formCard} aria-label="Create a Sanctuary post">
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
              <span>Title</span>
              <input name="title" type="text" placeholder="What would you like to discuss?" maxLength={160} required />
            </label>

            <label className={styles.field}>
              <span>Body</span>
              <textarea
                name="body"
                placeholder="Share your thoughts, questions, or experiences..."
                rows={5}
                maxLength={4000}
                required
              />
            </label>

            <fieldset className={styles.tags}>
              <legend>Tags</legend>
              <div>
                {postTags.map((tag) => (
                  <label key={tag}>
                    <input type="checkbox" name="tags" value={tag.toLowerCase()} />
                    <span>{tag}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <section className={styles.identityCard} aria-labelledby="anonymous-heading">
              <div className={styles.identityHeader}>
                <Image src="/sanctuary/anonymous-avatar.png" alt="" width={42} height={42} />
                <div>
                  <h2 id="anonymous-heading">Sister_Rose_42</h2>
                  <p>Your anonymous handle</p>
                </div>
                <button type="button" aria-label="Generate a new anonymous handle">
                  <span aria-hidden="true">↻</span>
                  Regenerate
                </button>
              </div>
              <label className={styles.toggleRow}>
                <span>Post anonymously</span>
                <input type="checkbox" name="anonymous" value="true" defaultChecked />
                <i aria-hidden="true" />
              </label>
            </section>

            <aside className={styles.reminder} aria-label="Community guidelines reminder">
              <strong>
                <span aria-hidden="true">▲</span>
                Community Guidelines Reminder
              </strong>
              <p>No hate speech, harassment, explicit content, misinformation, or requests for religious rulings.</p>
            </aside>
          </form>

          <SanctuarySidebar compact />
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ChatComposer from "./_components/ChatComposer";
import ZehraHeading from "./_components/ZehraHeading";
import { suggestedQuestions, zehraTopics } from "./data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Zehra AI | Nothing But Beauty",
  description: "A faith-rooted AI companion for guidance, duas, wellbeing, and spiritual growth.",
};

export default function ZehraAiPage() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <ZehraHeading />

        <section className={styles.welcome} aria-labelledby="zehra-welcome-title">
          <Image
            className={styles.avatar}
            src="/shared/zehra-avatar.webp"
            alt="Zehra AI"
            width={162}
            height={162}
            priority
          />
          <h2 id="zehra-welcome-title">Salaam Alaykum, Sister</h2>
          <p>I&apos;m Zehra AI, your faith companion.<br />How can I support you today?</p>
        </section>

        <section className={styles.topics} aria-label="Ways Zehra can help">
          {zehraTopics.map((topic) => (
            <Link href={`/portal/zehra-ai/chat?message=${encodeURIComponent(topic.prompt)}`} key={topic.label}>
              <Image src={topic.icon} alt="" width={58} height={58} />
              <h3>{topic.label}</h3>
            </Link>
          ))}
        </section>

        <section className={styles.askBanner} aria-label="Ask Zehra anything">
          <Image src="/zehra-ai/ask-zehra-banner.webp" alt="" fill sizes="730px" />
          <div>
            <h2>Ask Zehra anything</h2>
            <p>Get answers rooted in the Ahlul Bayt (a.s.)<br />teachings and trusted sources.</p>
          </div>
        </section>

        <section className={styles.suggestions} aria-labelledby="try-asking-title">
          <h2 id="try-asking-title">Try Asking</h2>
          <div>
            {suggestedQuestions.map((question) => (
              <a href={`/portal/zehra-ai/chat?message=${encodeURIComponent(question)}`} key={question}>
                <span><Image src="/zehra-ai/sparkle.svg" alt="" width={14} height={14} />{question}</span>
                <span className={styles.chevron} aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>
      </div>

      <ChatComposer className={styles.composer} />
    </main>
  );
}

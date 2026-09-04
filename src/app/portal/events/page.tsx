import type { Metadata } from "next";
import EventsBrowser from "./_components/EventsBrowser";
import EventsSearchPanel from "./_components/EventsSearchPanel";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Events & Workshops | Nothing But Beauty",
  description: "Meaningful events, workshops, and programs created for Muslim women to learn, grow, and connect.",
};

export default function EventsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="events-title">
        <p>GROW. CREATE. SEEK. LEARN. INSPIRE. EMPOWER.</p>
        <h1 id="events-title">Upcoming<br />Events &amp; Workshops</h1>
        <span>Discover meaningful events, workshops, and programs created for Muslim women to learn, grow, and connect.</span>
      </section>

      <section className={styles.eventsShell} aria-label="Browse upcoming events">
        <EventsSearchPanel />

        <EventsBrowser />
      </section>
    </main>
  );
}

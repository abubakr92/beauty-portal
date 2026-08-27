import type { Metadata } from "next";
import Image from "next/image";
import EventsBrowser from "./_components/EventsBrowser";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Events & Workshops | Nothing But Beauty",
  description: "Meaningful events, workshops, and programs created for Muslim women to learn, grow, and connect.",
};

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 5 5" />
    </svg>
  );
}

export default function EventsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="events-title">
        <p>FAITH. SISTERHOOD. PURPOSE.</p>
        <h1 id="events-title">Upcoming<br />Events &amp; Workshops</h1>
        <span>Discover meaningful events, workshops, and programs created for Muslim women to learn, grow, and connect.</span>
      </section>

      <section className={styles.eventsShell} aria-label="Browse upcoming events">
        <form className={styles.searchPanel} action="/portal/events" method="get">
          <label className={styles.searchField}>
            <SearchIcon />
            <span className={styles.visuallyHidden}>Search events</span>
            <input name="query" type="search" placeholder="Search events, workshops, or topics..." />
          </label>

          <label className={styles.filterField}>
            <LocationIcon />
            <span className={styles.visuallyHidden}>Location</span>
            <select name="location" defaultValue="all">
              <option value="all">All Locations</option>
            </select>
          </label>

          <label className={styles.filterField}>
            <Image src="/events/icon-date.svg" alt="" width={18} height={18} />
            <span className={styles.visuallyHidden}>Date</span>
            <select name="date" defaultValue="all">
              <option value="all">All Dates</option>
            </select>
          </label>

          <button className={styles.searchButton} type="submit"><SearchIcon /> Search</button>
        </form>

        <EventsBrowser />
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  calendarWeeks,
  categoryCounts,
  eventCategories,
  eventDays,
  events,
} from "./data";
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

        <div className={styles.contentGrid}>
          <div className={styles.eventColumn}>
            <nav className={styles.categoryTabs} aria-label="Event categories">
              {eventCategories.map((category, index) => (
                <a className={index === 0 ? styles.activeTab : undefined} href="#featured-events" key={category}>{category}</a>
              ))}
            </nav>

            <section className={styles.featuredEvents} id="featured-events" aria-labelledby="featured-events-heading">
              <h2 id="featured-events-heading">Featured Upcoming Events</h2>
              <div className={styles.eventList}>
                {events.map((event) => (
                  <article className={styles.eventCard} key={event.id}>
                    <div className={styles.eventImage}>
                      <Image src={event.image} alt="" fill sizes="(max-width: 700px) 100vw, 220px" />
                    </div>

                    <div className={styles.dateBadge} aria-label={`${event.dayName}, ${event.month} ${event.day}`}>
                      <span>{event.dayName}</span>
                      <strong>{event.day}</strong>
                      <span>{event.month}</span>
                    </div>

                    <div className={styles.eventCopy}>
                      <div className={styles.titleRow}>
                        <h3>{event.title}</h3>
                        <span>{event.category}</span>
                      </div>
                      <div className={styles.eventMeta}>
                        <span><Image src="/events/icon-time.svg" alt="" width={18} height={18} />{event.time}</span>
                        <span><LocationIcon />{event.location}</span>
                      </div>
                      <p>{event.description}</p>
                      <div className={styles.eventFooter}>
                        <div>
                          <span className={styles.audience}><span aria-hidden="true">♙</span>{event.audience}</span>
                          <span><Image src="/events/icon-spots.svg" alt="" width={18} height={18} />{event.spotsLeft} Spots Left</span>
                        </div>
                        <Link href={`/portal/events/${event.id}`}>View Details</Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <button className={styles.viewAllButton} type="button">View All Events <span aria-hidden="true">⌄</span></button>
            </section>
          </div>

          <aside className={styles.sidebar} aria-label="Event tools and highlights">
            <section className={styles.sidebarCard}>
              <h2><Image src="/events/icon-calendar.svg" alt="" width={24} height={24} /> Event Calendar</h2>
              <div className={styles.calendarHeader}><button type="button" aria-label="Previous month">‹</button><strong>May 2025</strong><button type="button" aria-label="Next month">›</button></div>
              <table className={styles.calendar}>
                <thead><tr>{["S", "M", "T", "W", "T", "F", "S"].map((day, index) => <th key={`${day}-${index}`}>{day}</th>)}</tr></thead>
                <tbody>
                  {calendarWeeks.map((week, weekIndex) => (
                    <tr key={weekIndex}>
                      {week.map((day, dayIndex) => <td key={`${weekIndex}-${dayIndex}`}>{day && <span className={eventDays.has(day) ? styles.eventDay : undefined}>{day}</span>}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
              <a href="#featured-events">View Full Calendar</a>
            </section>

            <section className={styles.sidebarCard}>
              <h2><span className={styles.flameIcon} aria-hidden="true">♨</span> Browse by Category</h2>
              <ul className={styles.categoryList}>
                {categoryCounts.map((category, index) => <li key={`${category.label}-${index}`}><span>{category.label}</span><strong>{category.count}</strong></li>)}
              </ul>
              <a href="#featured-events">View All Categories</a>
            </section>

            <section className={styles.sidebarCard}>
              <h2><span className={styles.flameIcon} aria-hidden="true">♨</span> Featured This Month</h2>
              <Link className={styles.monthFeature} href="/portal/events/preparing-hearts-muharram">
                <div><Image src="/shared/business-feast.png" alt="" fill sizes="145px" /></div>
                <span>
                  <strong>Preparing Our Hearts for Muharram</strong>
                  <small>Workshop</small>
                  <em><Image src="/events/icon-time.svg" alt="" width={17} height={17} />11:00 AM – 1:00 PM</em>
                  <em><LocationIcon />Islamabad, PK</em>
                </span>
              </Link>
            </section>

            <section className={styles.submitCard}>
              <h2>Submit Your Event</h2>
              <p>Host an event for our community?</p>
              <button type="button">Submit Event</button>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}

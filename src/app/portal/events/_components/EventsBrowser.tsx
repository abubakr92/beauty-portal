"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { EventSearchFilters } from "./EventsSearchPanel";
import { categoryCounts, eventCategories, events } from "../data";
import styles from "../page.module.css";

const highlightedCalendarDays: Record<string, Set<number>> = {
  "2025-4": new Set([8, 15, 22, 24, 25]),
};

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function getCalendarWeeks(month: Date) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const leadingDays = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells: Array<number | null> = [
    ...Array.from({ length: leadingDays }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return Array.from({ length: cells.length / 7 }, (_, index) => cells.slice(index * 7, index * 7 + 7));
}

function matchesCategory(eventCategory: string, activeCategory: string) {
  if (activeCategory === "All Events") {
    return true;
  }

  const normalizedActive = activeCategory.toLowerCase().replace(/s$/, "");
  return eventCategory.toLowerCase().startsWith(normalizedActive);
}

export default function EventsBrowser() {
  const [activeCategory, setActiveCategory] = useState("All Events");
  const [calendarMonth, setCalendarMonth] = useState(() => new Date(2025, 4, 1));
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [searchFilters, setSearchFilters] = useState<EventSearchFilters>({ query: "", location: "all", date: "all" });

  useEffect(() => {
    function receiveFilters(event: Event) {
      setSearchFilters((event as CustomEvent<EventSearchFilters>).detail);
    }
    window.addEventListener("events:filter", receiveFilters);
    return () => window.removeEventListener("events:filter", receiveFilters);
  }, []);

  const visibleEvents = events.filter((event) => {
    const normalizedQuery = searchFilters.query.trim().toLowerCase();
    return matchesCategory(event.category, activeCategory)
      && (!normalizedQuery || `${event.title} ${event.description} ${event.category}`.toLowerCase().includes(normalizedQuery))
      && (searchFilters.location === "all" || event.location.includes(searchFilters.location))
      && (searchFilters.date === "all" || event.day === searchFilters.date);
  });
  const calendarWeeks = useMemo(() => getCalendarWeeks(calendarMonth), [calendarMonth]);
  const calendarKey = `${calendarMonth.getFullYear()}-${calendarMonth.getMonth()}`;
  const eventDays = highlightedCalendarDays[calendarKey] ?? new Set<number>();
  const monthLabel = new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(calendarMonth);

  function selectCategory(category: string) {
    setActiveCategory(category);
    document.getElementById("featured-events")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function changeMonth(offset: number) {
    setCalendarMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));
    setSelectedDay(null);
  }

  return (
    <div className={styles.contentGrid}>
      <div className={styles.eventColumn}>
        <nav className={styles.categoryTabs} aria-label="Event categories">
          {eventCategories.map((category) => (
            <button
              className={activeCategory === category ? styles.activeTab : undefined}
              key={category}
              onClick={() => selectCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </nav>

        <section className={styles.featuredEvents} id="featured-events" aria-labelledby="featured-events-heading">
          <h2 id="featured-events-heading">Featured Upcoming Events</h2>
          <div className={styles.eventList} aria-live="polite">
            {visibleEvents.map((event) => (
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

            {!visibleEvents.length && (
              <div className={styles.emptyEvents}>
                <strong>No {activeCategory.toLowerCase()} are listed yet.</strong>
                <span>Choose another category to continue browsing.</span>
                <button onClick={() => selectCategory("All Events")} type="button">Show All Events</button>
              </div>
            )}
          </div>

          <button className={styles.viewAllButton} onClick={() => selectCategory("All Events")} type="button">
            View All Events <span aria-hidden="true">⌄</span>
          </button>
        </section>
      </div>

      <aside className={styles.sidebar} aria-label="Event tools and highlights">
        <section className={styles.submitCard} id="submit-event">
          <h2>Submit Your Event</h2>
          <p>Host an event for our community?</p>
          <Link href="/portal/events/submit">Submit Event</Link>
        </section>

        <section className={styles.sidebarCard}>
          <h2><Image src="/events/icon-calendar.svg" alt="" width={24} height={24} /> Event Calendar</h2>
          <div className={styles.calendarHeader}>
            <button onClick={() => changeMonth(-1)} type="button" aria-label="Previous month">‹</button>
            <strong aria-live="polite">{monthLabel}</strong>
            <button onClick={() => changeMonth(1)} type="button" aria-label="Next month">›</button>
          </div>
          <table className={styles.calendar}>
            <thead><tr>{["S", "M", "T", "W", "T", "F", "S"].map((day, index) => <th key={`${day}-${index}`}>{day}</th>)}</tr></thead>
            <tbody>
              {calendarWeeks.map((week, weekIndex) => (
                <tr key={weekIndex}>
                  {week.map((day, dayIndex) => (
                    <td key={`${weekIndex}-${dayIndex}`}>
                      {day && (
                        <button
                          className={`${eventDays.has(day) ? styles.eventDay : ""} ${selectedDay === day ? styles.selectedDay : ""}`.trim()}
                          onClick={() => setSelectedDay(day)}
                          type="button"
                          aria-pressed={selectedDay === day}
                          aria-label={`${monthLabel} ${day}${eventDays.has(day) ? ", event available" : ""}`}
                        >
                          {day}
                        </button>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className={styles.calendarStatus} aria-live="polite">
            {selectedDay ? `${monthLabel} ${selectedDay} selected` : "Select a date to explore events"}
          </p>
          <a href="#featured-events">View Full Calendar</a>
        </section>

        <section className={styles.sidebarCard}>
          <h2><span className={styles.flameIcon} aria-hidden="true">♨</span> Browse by Category</h2>
          <ul className={styles.categoryList}>
            {categoryCounts.map((category) => (
              <li key={category.label}>
                <button
                  className={activeCategory === category.label ? styles.activeCategory : undefined}
                  onClick={() => selectCategory(category.label)}
                  type="button"
                >
                  <span>{category.label}</span><strong>{category.count}</strong>
                </button>
              </li>
            ))}
          </ul>
          <button className={styles.categoryReset} onClick={() => selectCategory("All Events")} type="button">View All Categories</button>
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
      </aside>
    </div>
  );
}

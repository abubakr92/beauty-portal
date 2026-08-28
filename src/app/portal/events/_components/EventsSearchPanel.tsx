"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import styles from "../page.module.css";

function LocationIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
}

function SearchIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg>;
}

export type EventSearchFilters = { query: string; location: string; date: string };

export default function EventsSearchPanel() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("all");
  const [date, setDate] = useState("all");

  function applyFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.dispatchEvent(new CustomEvent<EventSearchFilters>("events:filter", { detail: { query, location, date } }));
    document.getElementById("featured-events")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <form className={styles.searchPanel} onSubmit={applyFilters}>
      <label className={styles.searchField}>
        <SearchIcon />
        <span className={styles.visuallyHidden}>Search events</span>
        <input name="query" onChange={(event) => setQuery(event.target.value)} value={query} type="search" placeholder="Search events, workshops, or topics..." />
      </label>

      <label className={styles.filterField}>
        <LocationIcon />
        <span className={styles.visuallyHidden}>Location</span>
        <select name="location" onChange={(event) => setLocation(event.target.value)} value={location}>
          <option value="all">All Locations</option>
          <option value="Islamabad">Islamabad, PK</option>
          <option value="Online">Online</option>
        </select>
      </label>

      <label className={styles.filterField}>
        <Image src="/events/icon-date.svg" alt="" width={18} height={18} />
        <span className={styles.visuallyHidden}>Date</span>
        <select name="date" onChange={(event) => setDate(event.target.value)} value={date}>
          <option value="all">All Dates</option>
          <option value="24">August 24</option>
          <option value="25">August 25</option>
          <option value="31">August 31</option>
        </select>
      </label>

      <button className={styles.searchButton} type="submit"><SearchIcon /> Search</button>
    </form>
  );
}

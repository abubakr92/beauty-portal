"use client";

import { useState } from "react";
import styles from "./page.module.css";

type EventActionsProps = {
  eventId: string;
  title: string;
  date: string;
  location: string;
};

export default function EventActions({ eventId, title, date, location }: EventActionsProps) {
  const [registered, setRegistered] = useState(false);
  const [status, setStatus] = useState("");

  function addToCalendar() {
    const calendar = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `UID:${eventId}@nothingbutbeauty.portal`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${date}`,
      `LOCATION:${location}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([calendar], { type: "text/calendar" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${eventId}.ics`;
    link.click();
    URL.revokeObjectURL(url);
    setStatus("Calendar file downloaded.");
  }

  async function shareEvent() {
    const shareData = { title, text: `${title} — ${date}`, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(window.location.href);
        setStatus("Event link copied to clipboard.");
      }
    } catch {
      setStatus("Sharing was cancelled.");
    }
  }

  return (
    <>
      <button aria-pressed={registered} onClick={() => { setRegistered((current) => !current); setStatus(registered ? "Registration cancelled." : "Your place has been reserved."); }} type="button">
        {registered ? "Registered ✓" : "Register Now"}
      </button>
      <div><button onClick={addToCalendar} type="button">+ Calendar</button><button onClick={shareEvent} type="button">Share</button></div>
      {status && <p className={styles.actionStatus} role="status">{status}</p>}
    </>
  );
}

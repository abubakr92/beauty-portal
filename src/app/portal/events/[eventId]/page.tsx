import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { eventDetails } from "../data";
import EventActions from "./EventActions";
import styles from "./page.module.css";

type EventDetailsPageProps = {
  params: Promise<{ eventId: string }>;
};

export function generateStaticParams() {
  return Object.keys(eventDetails).map((eventId) => ({ eventId }));
}

export async function generateMetadata({ params }: EventDetailsPageProps): Promise<Metadata> {
  const { eventId } = await params;
  const event = eventDetails[eventId];

  return {
    title: event ? `${event.heroTitle} | Nothing But Beauty Events` : "Event Not Found",
    description: event?.about,
  };
}

export default async function EventDetailsPage({ params }: EventDetailsPageProps) {
  const { eventId } = await params;
  const event = eventDetails[eventId];

  if (!event) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="event-title">
        <Link className={styles.backLink} href="/portal/events"><span aria-hidden="true">←</span> Back</Link>
        <h1 id="event-title">{event.heroTitle}</h1>
        <div className={styles.heroMeta}><span>📅 {event.heroDate}</span><span>🌐 {event.heroLocation}</span></div>
        <div className={styles.about}>
          <h2>About this Event</h2>
          <p>{event.about}</p>
        </div>
      </section>

      <section className={styles.detailsShell}>
        <div className={styles.mainColumn}>
          <div className={styles.heroImage}>
            <Image src={event.heroImage} alt="Women attending a peaceful guided wellness workshop" fill priority sizes="(max-width: 980px) 100vw, 74vw" />
          </div>

          <section className={styles.organizerCard} aria-labelledby="organizer-heading">
            <h2 id="organizer-heading">Organizer</h2>
            <div className={styles.organizerContent}>
              <div className={styles.organizerIdentity}>
                <Image src={event.organizer.avatar} alt="" width={72} height={72} />
                <div><strong>{event.organizer.name}</strong><span>{event.organizer.role}</span></div>
              </div>
              <address>
                <a href={`tel:${event.organizer.phone}`}><span aria-hidden="true">⌕</span>{event.organizer.phone}</a>
                <a href={`mailto:${event.organizer.email}`}><span aria-hidden="true">✉</span>{event.organizer.email}</a>
              </address>
            </div>
          </section>
        </div>

        <aside className={styles.sidebar} aria-label="Registration information">
          <section className={styles.registrationCard}>
            <h2>{event.registrationLabel}</h2>
            <p>{event.availability}</p>
            <EventActions eventId={event.id} title={event.title} date={event.heroDate} location={event.heroLocation} />
          </section>

          <section className={styles.priceCard}><h2>Price</h2><span>{event.displayPrice}</span></section>

          <section className={styles.formatCard}>
            <h2>{event.formatTitle}</h2>
            <p>{event.formatDescription}</p>
          </section>
        </aside>
      </section>
    </main>
  );
}

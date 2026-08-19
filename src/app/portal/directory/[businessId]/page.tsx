import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { businessProfiles } from "../data";
import styles from "./page.module.css";

type BusinessProfilePageProps = {
  params: Promise<{ businessId: string }>;
};

export function generateStaticParams() {
  return Object.keys(businessProfiles).map((businessId) => ({ businessId }));
}

export async function generateMetadata({ params }: BusinessProfilePageProps): Promise<Metadata> {
  const { businessId } = await params;
  const business = businessProfiles[businessId];

  return {
    title: business ? `${business.name} | Nothing But Beauty` : "Business Not Found",
    description: business?.description,
  };
}

export default async function BusinessProfilePage({ params }: BusinessProfilePageProps) {
  const { businessId } = await params;
  const business = businessProfiles[businessId];

  if (!business) {
    notFound();
  }

  const contactRows = [
    { icon: "/directory/icon-phone.png", label: business.contact.phone, href: `tel:${business.contact.phone}` },
    { icon: "/directory/icon-email.png", label: business.contact.email, href: `mailto:${business.contact.email}` },
    { icon: "/directory/icon-instagram.png", label: business.contact.instagram, href: "https://instagram.com" },
    { icon: "/directory/icon-website.png", label: business.contact.website, href: "https://noursunnah.com" },
    { icon: "/directory/icon-location.png", label: business.contact.location },
  ];

  return (
    <main className={styles.page}>
      <section className={styles.profileHero} aria-labelledby="business-name">
        <Link className={styles.backLink} href="/portal/directory"><span aria-hidden="true">←</span> Back</Link>
        <div className={styles.identity}>
          <Image src={business.avatar} alt="" width={88} height={88} priority />
          <div>
            <h1 id="business-name">{business.name}</h1>
            <div className={styles.identityMeta}>
              <span>{business.category}</span>
              <strong><span aria-hidden="true">★</span> {business.rating}</strong>
              <span>({business.reviews} Google reviews)</span>
            </div>
          </div>
        </div>
        <div className={styles.about}>
          <h2>About Us</h2>
          <p>{business.description}</p>
        </div>
      </section>

      <section className={styles.profileShell}>
        <section className={styles.gallery} aria-labelledby="gallery-heading">
          <h2 id="gallery-heading">Gallery</h2>
          <div className={styles.galleryGrid}>
            {business.gallery.map((image) => (
              <div className={styles.galleryImage} key={image.src}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 600px) calc(100vw - 36px), (max-width: 820px) 48vw, 31vw"
                />
              </div>
            ))}
          </div>
        </section>

        <aside className={styles.sidebar} aria-label="Business information">
          <section className={styles.infoCard}>
            <h2>Contact</h2>
            <ul className={styles.contactList}>
              {contactRows.map((item) => (
                <li key={item.label}>
                  <Image src={item.icon} alt="" width={24} height={24} />
                  {item.href ? <a href={item.href}>{item.label}</a> : <span>{item.label}</span>}
                </li>
              ))}
            </ul>
            <a className={styles.contactButton} href={`mailto:${business.contact.email}`}>Contact Business</a>
          </section>

          <section className={styles.mapCard} aria-label={business.serviceArea}>
            <div className={styles.map} aria-hidden="true">
              <span className={styles.mapPark}>Washington<br />Park</span>
              <span className={styles.mapCity}>Dearborn</span>
              <span className={styles.mapPin}>●</span>
            </div>
            <p>{business.serviceArea}</p>
          </section>

          <section className={styles.infoCard}>
            <h2>Operating Hours</h2>
            <dl className={styles.hoursList}>
              {business.hours.map((hours) => (
                <div key={hours.day}>
                  <dt>{hours.day}</dt>
                  <dd>{hours.time}</dd>
                </div>
              ))}
            </dl>
          </section>
        </aside>
      </section>
    </main>
  );
}

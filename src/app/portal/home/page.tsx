// The previous home page is preserved in ./_previous/PreviousHomePage.tsx.
// To switch back, replace this file's contents with:
//   export { default } from "./_previous/PreviousHomePage";
import Image from "next/image";
import Link from "next/link";
import MainFooter from "@/components/shared/MainFooter";
import {
  ArrowIcon,
  BookIcon,
  CalendarIcon,
  GlobeIcon,
  HeartIcon,
  LeafIcon,
  MapPinIcon,
  StoreIcon,
  UsersIcon,
} from "./_components/HomeIcons";
import SaveBusinessButton from "./_components/SaveBusinessButton";
import {
  appFeatures,
  journeyResources,
  memberName,
  missionPillars,
  nearbyBusinesses,
  spotlightEvent,
} from "./data";
import styles from "./page.module.css";

const pillarIcons = {
  leaf: LeafIcon,
  users: UsersIcon,
  heart: HeartIcon,
  globe: GlobeIcon,
};

export default function HomePage() {
  return (
    <>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.greeting}>Assalamu alaykum,</p>
            <h1>
              {memberName} <HeartIcon className={styles.nameHeart} />
              <span>Welcome to Your Space</span>
            </h1>
            <p className={styles.heroText}>
              A faith-centered community created for Muslim women to connect, grow, and make a positive impact.
            </p>
            <Link className={styles.goldButton} href="#explore">
              Explore Now <ArrowIcon />
            </Link>
          </div>

          <div className={styles.heroDevices} aria-hidden="true">
            <Image
              className={styles.backPhone}
              src="/home/phone-events.png"
              alt=""
              width={460}
              height={948}
              sizes="(max-width: 760px) 34vw, 200px"
            />
            <Image
              className={styles.frontPhone}
              src="/home/phone-welcome.png"
              alt=""
              width={680}
              height={1146}
              priority
              sizes="(max-width: 760px) 50vw, 300px"
            />
          </div>

          <p className={styles.heroQuote}>
            When women support each other, extraordinary things happen.
            <HeartIcon />
          </p>
        </section>

        <section className={styles.mission} aria-labelledby="mission-title">
          <Image className={styles.missionFloral} src="/sanctuary/sanctuary-floral-corner.png" alt="" width={96} height={96} />
          <div className={styles.missionHeading}>
            <p className={styles.eyebrow}>Our Mission</p>
            <h2 id="mission-title">Together, We Build Brighter Tomorrows</h2>
          </div>
          <p className={styles.missionText}>
            Nothing But Beauty Portal is a global platform for Muslim women who love the Ahlulbayt (AS). We connect,
            uplift and empower through sisterhood, knowledge, business, wellness, and purpose — creating a kinder
            world, one woman at a time.
          </p>
          <ul className={styles.pillars}>
            {missionPillars.map((pillar) => {
              const PillarIcon = pillarIcons[pillar.icon];
              return (
                <li key={pillar.label}>
                  <PillarIcon />
                  <span>{pillar.label}</span>
                </li>
              );
            })}
          </ul>
        </section>

        <div className={styles.dashboard} id="explore">
          <div className={styles.mainColumn}>
            <section className={styles.card} aria-labelledby="spotlight-title">
              <header className={styles.cardHeader}>
                <h2 id="spotlight-title">
                  <CalendarIcon /> Upcoming Event Spotlight
                </h2>
                <Link href="/portal/events">
                  View All Events <ArrowIcon />
                </Link>
              </header>

              <div className={styles.spotlight}>
                <div className={styles.poster}>
                  <Image
                    src={spotlightEvent.image}
                    alt=""
                    fill
                    sizes="(max-width: 760px) 100vw, 360px"
                  />
                  <div className={styles.posterText}>
                    <strong>{spotlightEvent.posterTitle}</strong>
                    <span>{spotlightEvent.posterSubtitle}</span>
                    <small>{spotlightEvent.posterSteps.join("  |  ")}</small>
                  </div>
                </div>

                <div className={styles.spotlightBody}>
                  <span className={styles.badge}>{spotlightEvent.label}</span>
                  <h3>{spotlightEvent.title}</h3>
                  <p>{spotlightEvent.description}</p>
                  <ul className={styles.eventMeta}>
                    <li>
                      <CalendarIcon /> {spotlightEvent.date}
                    </li>
                    <li>
                      <MapPinIcon /> {spotlightEvent.location}
                    </li>
                  </ul>
                  <Link className={styles.emeraldButton} href={spotlightEvent.href}>
                    View Event Details <ArrowIcon />
                  </Link>
                </div>
              </div>
            </section>

            <section className={styles.card} aria-labelledby="businesses-title">
              <header className={styles.cardHeader}>
                <h2 id="businesses-title">
                  <StoreIcon /> Featured Businesses Near You
                </h2>
                <Link href="/portal/directory">
                  View Directory <ArrowIcon />
                </Link>
              </header>

              <div className={styles.tileGrid}>
                {nearbyBusinesses.map((business) => (
                  <article className={styles.businessTile} key={business.name}>
                    <div className={styles.tileImage}>
                      <Image src={business.image} alt="" fill sizes="(max-width: 760px) 50vw, 180px" />
                    </div>
                    <div className={styles.businessBody}>
                      <h3>
                        <Link href="/portal/directory">{business.name}</Link>
                      </h3>
                      <p>{business.category}</p>
                      <div className={styles.businessFooter}>
                        <span>
                          <MapPinIcon /> {business.location}
                        </span>
                        <SaveBusinessButton className={styles.saveButton} businessName={business.name} />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.card} aria-labelledby="resources-title">
              <header className={styles.cardHeader}>
                <h2 id="resources-title">
                  <BookIcon /> Resources for Your Journey
                </h2>
                <Link href="/portal/resources">
                  View Resources <ArrowIcon />
                </Link>
              </header>

              <div className={styles.tileGrid}>
                {journeyResources.map((resource) => (
                  <Link className={styles.resourceTile} href="/portal/resources" key={resource.title}>
                    <div className={styles.tileImage}>
                      <Image src={resource.image} alt="" fill sizes="(max-width: 760px) 50vw, 180px" />
                    </div>
                    <span>
                      {resource.title} <ArrowIcon />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <aside className={styles.sideColumn} aria-label="Community highlights">
            <section className={`${styles.sideCard} ${styles.darkCard} ${styles.quoteCard}`}>
              <p className={styles.eyebrow}>Quote of the Day</p>
              <blockquote>“Stand firm in who you are, even when the world expects you to shrink.”</blockquote>
              <p className={styles.quoteSource}>— Inspired by Bibi Zainab (AS)</p>
              <Link className={styles.goldButton} href="/portal/zehra-ai">
                Reflect with Zehra AI <ArrowIcon />
              </Link>
              <Image className={styles.sideFloral} src="/sanctuary/sanctuary-floral-corner.png" alt="" width={150} height={150} />
            </section>

            <section className={`${styles.sideCard} ${styles.lightCard}`}>
              <h2>
                <CalendarIcon /> Promote Your Event
              </h2>
              <p>Share your events and workshops with a growing community of Muslim women.</p>
              <Link className={styles.goldButton} href="/portal/events/submit">
                List Your Event <ArrowIcon />
              </Link>
              <div className={styles.sideImage}>
                <Image src="/resources/resource-journal.webp" alt="" fill sizes="150px" />
              </div>
            </section>

            <section className={`${styles.sideCard} ${styles.darkCard} ${styles.joinCard}`}>
              <h2>
                <UsersIcon /> Join the Community
              </h2>
              <p>Invite a sister to join and help grow our network. Together we create a stronger, kinder world.</p>
              <Link className={styles.goldButton} href="/portal/join-community">
                Share with a Sister <ArrowIcon />
              </Link>
              <HeartIcon className={styles.joinHeart} />
            </section>

            <section className={`${styles.sideCard} ${styles.lightCard}`}>
              <h2>
                <HeartIcon /> Support Our Cause
              </h2>
              <p>Help us continue building a space that uplifts, empowers, and supports Muslim women everywhere.</p>
              <Link className={styles.goldButton} href="/portal/about#inquiry">
                Make a Contribution <ArrowIcon />
              </Link>
              <div className={styles.sideImage}>
                <Image src="/dashboard/saved/product-gold.png" alt="" fill sizes="150px" />
              </div>
            </section>
          </aside>
        </div>

        <section className={styles.appBanner} aria-labelledby="app-title">
          <div className={styles.appPhone} aria-hidden="true">
            <Image src="/home/phone-welcome.png" alt="" width={680} height={1146} sizes="200px" />
          </div>
          <div className={styles.appCopy}>
            <p>The Nothing But Beauty Portal App</p>
            <h2 id="app-title">A Kinder World, In Your Hands</h2>
            <p>
              Stay connected to events, women-led businesses, resources and a global sisterhood — all in one place.
            </p>
            <div className={styles.storeButtons}>
              <button type="button" title="Coming soon">
                <Image className={styles.appleLogo} src="/auth/apple.png" alt="" width={18} height={23} />
                <span>
                  <small>Download on the</small> App Store
                </span>
              </button>
              <button type="button" title="Coming soon">
                <Image src="/auth/google.png" alt="" width={22} height={22} />
                <span>
                  <small>Get it on</small> Google Play
                </span>
              </button>
            </div>
          </div>
          <ul className={styles.appFeatures}>
            {appFeatures.map((feature) => (
              <li key={feature.label}>
                <Link href={feature.href}>
                  <Image src={feature.icon} alt="" width={42} height={42} />
                  {feature.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className={styles.appScript} aria-hidden="true">
            Download
            <br />
            Share
            <br />
            Grow Together
          </p>
        </section>
      </main>
      <MainFooter />
    </>
  );
}

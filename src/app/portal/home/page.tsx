import Image from "next/image";
import Link from "next/link";
import MainFooter from "@/components/shared/MainFooter";
import styles from "./page.module.css";

const features = [
  {
    title: "Business Directory",
    description: "Discover, support, and collaborate with women-owned businesses",
    href: "/portal/directory",
    icon: "/home/feature-directory.svg",
  },
  {
    title: "Sisterhood Sanctuary",
    description: "Connect in a private, faith-focused space built on trust and mutual purpose",
    href: "/portal/sanctuary",
    icon: "/home/feature-sanctuary.svg",
  },
  {
    title: "Zehra AI",
    description: "Your faith companion for guidance, reflection, and growth",
    href: "/portal/zehra-ai",
    icon: "/home/feature-zehra-ai.svg",
  },
  {
    title: "Events & Workshops",
    description: "Join inspiring, educational events and retreats that foster and support",
    href: "/portal/events",
    icon: "/home/feature-events.svg",
  },
  {
    title: "Resources Library",
    description: "Access faith-based educational content, tools, and affirmations to resource you",
    href: "/portal/resources",
    icon: "/home/feature-resources.svg",
  },
];

const portalProducts = [
  { title: "Business Directory", image: "/home/phone-directory.png" },
  { title: "Sanctuary", image: "/home/phone-sanctuary.png" },
  { title: "Zehra AI", image: "/home/phone-zehra-ai.png" },
  { title: "Events", image: "/home/phone-events.png" },
  { title: "Resources", image: "/home/phone-resources.png" },
];

const values = [
  { label: "Faith-Centered", icon: "/home/value-faith.png" },
  { label: "Sisterhood", icon: "/home/value-sisterhood.png" },
  { label: "Empowerment", icon: "/home/value-empowerment.png" },
  { label: "Opportunities", icon: "/home/stat-resources.png" },
  { label: "Service", icon: "/home/value-service.png" },
];

const stats = [
  { value: "10K+", label: "Women Registered", icon: "/home/stat-women.png" },
  { value: "45+", label: "Countries", icon: "/home/stat-countries.png" },
  { value: "500+", label: "Events Hosted", icon: "/home/stat-events.png" },
  { value: "2K+", label: "Resources Listed", icon: "/home/stat-resources.png" },
  { value: "50K+", label: "Monthly Community Interactions", icon: "/home/stat-community.png" },
];

const faqs = [
  {
    question: "Is Nothing But Beauty Portal only for Muslim women?",
    answer: "The portal is designed as a faith-centered community for Muslim women around the world.",
  },
  {
    question: "Is the app free to use?",
    answer: "Core community features are free, with optional business membership plans for added visibility.",
  },
  {
    question: "Will there be a membership fee?",
    answer: "Member access is free. Business owners can choose an optional plan that suits their needs.",
  },
  {
    question: "What kind of content will be available?",
    answer: "You will find events, resources, scholar archives, business listings, community discussions, and AI-guided support.",
  },
];

export default function LandingPage() {
  return (
    <>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <h1>
              Connecting Women
              <br />
              Rooted in Faith to
              <br />
              <em>Grow</em> and <em>Lead</em>
            </h1>
            <p>
              Nothing But Beauty Portal is the all-in-one digital home for Shia Muslim women, community,
              business, learning, events, and AI guidance, together.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/portal/join-community">
                Join the Waitlist <span aria-hidden="true">→</span>
              </Link>
              <Link className={styles.secondaryButton} href="#explore">
                Explore the Portal
              </Link>
            </div>
          </div>

          <div className={styles.heroPhone} aria-hidden="true">
            <Image
              src="/home/phone-welcome.png"
              alt=""
              width={680}
              height={1146}
              priority
              sizes="(max-width: 900px) 50vw, 340px"
            />
          </div>

          <div className={styles.featureGrid}>
            {features.map((feature) => (
              <Link className={styles.featureCard} href={feature.href} key={feature.title}>
                <Image src={feature.icon} alt="" width={42} height={42} />
                <h2>{feature.title}</h2>
                <p>{feature.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.quoteBanner}>
          <Image src="/home/quote-mark.svg" alt="" width={47} height={32} />
          <blockquote>The most beautiful woman is the one who walks in faith, helps others, and never stops growing.</blockquote>
          <Link href="/portal/zehra-ai">
            Reflect with Zehra AI <span aria-hidden="true">→</span>
          </Link>
          <Image className={styles.quoteFloral} src="/home/floral-outline.svg" alt="" width={121} height={120} />
        </section>

        <section className={styles.productSection} id="explore">
          <div className={styles.sectionHeading}>
            <span />
            <h2>Everything You Need. All in One Place.</h2>
            <span />
          </div>
          <div className={styles.productGrid}>
            {portalProducts.map((product) => (
              <article key={product.title}>
                <h3>{product.title}</h3>
                <Image
                  src={product.image}
                  alt={`${product.title} mobile app preview`}
                  width={460}
                  height={948}
                  sizes="(max-width: 700px) 70vw, (max-width: 1000px) 34vw, 220px"
                />
              </article>
            ))}
          </div>
        </section>

        <section className={styles.movement} id="about">
          <div className={styles.movementImage}>
            <Image
              src="/home/community-movement.png"
              alt="Muslim women connecting and learning together"
              width={1028}
              height={528}
            />
          </div>
          <div className={styles.movementCopy}>
            <h2>More Than an App — A Movement</h2>
            <p>
              We&apos;re building a global sisterhood where Faith Fuels purpose and together, we uplift,
              empower, and create impact in our communities and beyond.
            </p>
            <div className={styles.values}>
              {values.map((value) => (
                <div key={value.label}>
                  <Image src={value.icon} alt="" width={61} height={61} />
                  <span>{value.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.stats} aria-label="Community statistics">
          {stats.map((stat) => (
            <div key={stat.label}>
              <Image src={stat.icon} alt="" width={72} height={72} />
              <p>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </p>
            </div>
          ))}
        </section>

        <section className={styles.storyGrid}>
          <article className={styles.howItWorks}>
            <h2>How It Works</h2>
            <ol>
              <li><span>01</span> Join the Waitlist</li>
              <li><span>02</span> Get Early Access</li>
              <li><span>03</span> Connect &amp; Grow</li>
              <li><span>04</span> Make an Impact</li>
            </ol>
            <Image src="/home/open-book.png" alt="" width={286} height={250} />
          </article>

          <article>
            <h2>A Note from Our Founder</h2>
            <blockquote>
              “This portal was born from a dream to create a safe, empowering space for Muslim women, to grow
              together in faith and wellness — and lead with purpose and love.”
            </blockquote>
            <p>— Zehra</p>
          </article>

          <article>
            <h2>What Our Community Says</h2>
            <blockquote>“This is more than an app — it&apos;s a reminder for never walking alone.”</blockquote>
            <p>— A. Khan</p>
          </article>
        </section>

        <section className={styles.joinSection}>
          <div className={styles.faqs}>
            <h2>Frequently Asked Questions</h2>
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}<span aria-hidden="true">⌄</span></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>

          <div className={styles.waitlistCard}>
            <div>
              <h2>Join the Waitlist</h2>
              <p>Be the first to get early access, exclusive updates, and special launch perks.</p>
            </div>
            <form>
              <label>
                <span>Full Name</span>
                <input type="text" name="name" placeholder="Full Name" autoComplete="name" />
              </label>
              <label>
                <span>Email Address</span>
                <input type="email" name="email" placeholder="Email Address" autoComplete="email" />
              </label>
              <button type="button">Join the Waitlist <span aria-hidden="true">→</span></button>
            </form>
          </div>
        </section>
      </main>
      <MainFooter />
    </>
  );
}

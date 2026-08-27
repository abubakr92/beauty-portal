import Image from "next/image";
import styles from "./layout.module.css";

const storyBenefits = [
  {
    icon: "/auth/icon-sisterhood.svg",
    title: "Built for Sisterhood",
    description: "Connect in a safe, private space with women who share your values.",
  },
  {
    icon: "/auth/icon-faith-purpose.svg",
    title: "Grow in Faith & Purpose",
    description: "Access events, workshops, reminders, and Islamic resources.",
  },
  {
    icon: "/auth/icon-support.svg",
    title: "Support & Be Supported",
    description: "Discover women-led businesses and opportunities that uplift and inspire.",
  },
] as const;

const communityValues = [
  ["/auth/icon-faith-centered.svg", "Faith-Centered"],
  ["/auth/icon-private-safe.svg", "Private & Safe"],
  ["/auth/icon-women-led.svg", "Women-Led"],
  ["/auth/icon-purpose-driven.svg", "Purpose-Driven"],
] as const;

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className={styles.authShell}>
        <aside className={styles.storyPanel}>
          <div className={styles.intro}>
            <p>FAITH | SISTERHOOD | GROWTH | PURPOSE</p>
            <h1>
              Join a Faith-Centered
              <br />
              Community of
              <br />
              <strong>Muslim Women</strong>
            </h1>
            <span>
              Nothing But Beauty Portal is your digital home for connection, learning,
              <br className={styles.desktopBreak} /> trusted businesses, and AI-guided faith support.
            </span>
          </div>

          <div className={styles.benefits}>
            {storyBenefits.map((benefit) => (
              <article key={benefit.title}>
                <Image src={benefit.icon} alt="" width={52} height={52} />
                <div>
                  <h2>{benefit.title}</h2>
                  <p>{benefit.description}</p>
                </div>
              </article>
            ))}
          </div>

          <blockquote className={styles.testimonial}>
            <span aria-hidden="true">“</span>
            <p>This platform feels like a breath of fresh air. A space where I can grow, learn, and feel connected to my community.</p>
            <div className={styles.testimonialPhoto}>
              <Image src="/home/community-movement.png" alt="Sister Fatima" fill sizes="84px" />
            </div>
            <cite>Sister Fatima</cite>
          </blockquote>

          <div className={styles.values}>
            {communityValues.map(([icon, label]) => (
              <div key={label}>
                <Image src={icon} alt="" width={42} height={42} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </aside>

        <section className={styles.formStage}>{children}</section>
    </main>
  );
}

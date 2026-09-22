import type { Metadata } from "next";
import Image from "next/image";
import InquiryForm from "./InquiryForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About Us | Nothing But Beauty Portal",
  description: "Learn about the faith-centered mission behind Nothing But Beauty Portal.",
};

const values = [
  ["/home/value-faith.png", "Faith", "Faith sits at the heart of how we learn, connect, serve, and grow."],
  ["/home/value-sisterhood.png", "Sisterhood", "A welcoming space where Muslim women can feel seen, supported, and connected."],
  ["/home/value-empowerment.png", "Empowerment", "Practical access to trusted knowledge, opportunities, and meaningful support."],
  ["/home/value-service.png", "Service", "Purpose-led tools and relationships that help women create positive impact."],
];

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div><p>ABOUT NOTHING BUT BEAUTY</p><h1>About Us</h1><span>Nothing But Beauty Portal is a faith-centered digital platform dedicated to empowering Muslim women to connect, grow, and lead with purpose. Built on the core values of faith, sisterhood, and community, the portal provides a safe and private space where members can engage in meaningful discussions in the Sanctuary, discover women-owned businesses, access curated educational resources, and connect with Zehra AI for faith-rooted guidance. Together, we are building a global movement where women support one another, deepen their faith, and create lasting impact.</span></div>
        <Image src="/home/community-movement.png" alt="Muslim women connecting and learning together" width={1028} height={528} priority />
      </section>

      <section className={styles.mission} id="mission">
        <div><p>OUR MISSION</p><h2>Connect. Learn. Heal. Build. Lead.</h2></div>
        <p>To create a safe, inspiring, and faith-rooted digital sanctuary where Shia women feel empowered to connect, learn, heal, build, and lead.</p>
      </section>

      <section className={styles.values} aria-label="Our values">{values.map(([icon, title, copy]) => <article key={title}><Image src={icon} alt="" width={70} height={70} /><h2>{title}</h2><p>{copy}</p></article>)}</section>

      <section className={styles.story}><p>A COMMUNITY WITH PURPOSE</p><h2>Built for Connection. Guided by Faith.</h2><div><p>From honest conversations in Sanctuary to trusted businesses in the Directory, every part of the portal is designed to make support easier to find and community easier to build.</p><p>We want Muslim women to have one beautiful, thoughtful space to discover resources, learn, ask questions, share experiences, and move forward with confidence.</p></div></section>

      <section className={styles.inquiry} id="inquiry"><header><p>GET IN TOUCH</p><h2>Have a Question or an Idea?</h2><span>Whether you&apos;re interested in partnership, membership, community support, or simply want to say salaam, we&apos;d love to hear from you.</span></header><InquiryForm /></section>
    </main>
  );
}

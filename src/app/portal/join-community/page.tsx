import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MembershipWizard from "./_components/MembershipWizard";
import { communityBenefits } from "./data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Business Membership | Nothing But Beauty",
  description: "Build a trusted business presence and connect with women looking for values-aligned services and products.",
};

export default function JoinCommunityPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroIntro}>
          <p>For Business Owners</p>
          <h1>Be Discovered.<br />Build Trust. Grow.</h1>
          <span>Showcase your business to a growing community of Muslim women looking for trusted products, services, and professionals.</span>
          <Link className={styles.heroButton} href="#membership-plans">View Memberships</Link>
          <small>Plans starting at $15/month</small>
        </div>

        <div className={styles.benefits}>
          {communityBenefits.map((benefit) => (
            <article key={benefit.title}>
              <Image src={benefit.icon} alt="" width={50} height={50} />
              <div><h2>{benefit.title}</h2><p>{benefit.description}</p></div>
            </article>
          ))}
        </div>

        <blockquote className={styles.verse}>
          <p>“And whoever relies upon Allah — then He is sufficient for him.”</p>
          <cite>Qur&apos;an 65:3</cite>
        </blockquote>
      </section>

      <MembershipWizard />
    </main>
  );
}

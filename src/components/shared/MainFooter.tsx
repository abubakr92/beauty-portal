import Image from "next/image";
import Link from "next/link";
import styles from "./MainFooter.module.css";

export default function MainFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.brand}>
          <Image src="/shared/brand-logo.svg" alt="Nothing But Beauty Portal" width={292} height={63} />
          <p>A faith-centered portal connecting women through sisterhood, knowledge, wellness, and purpose — united by faith.</p>
        </div>

        <div>
          <h2>Explore</h2>
          <Link href="/portal/sanctuary">Sanctuary</Link>
          <Link href="/portal/zehra-ai">Zehra AI</Link>
          <Link href="/portal/directory">Directory</Link>
          <Link href="/portal/events">Events</Link>
          <Link href="/portal/resources">Resources</Link>
        </div>

        <div>
          <h2>Company</h2>
          <Link href="/portal/home#about">About Us</Link>
          <Link href="/portal/home#about">Our Mission</Link>
          <a href="mailto:hello@nothingbutbeautyportal.com?subject=Careers">Careers</a>
          <a href="mailto:hello@nothingbutbeautyportal.com">Contact Us</a>
        </div>

        <div>
          <h2>Support</h2>
          <Link href="/portal/resources">Help Center</Link>
          <Link href="/portal/sanctuary#community-guidelines">Community Guidelines</Link>
          <Link href="/portal/home#about">Privacy Policy</Link>
          <Link href="/portal/home#about">Terms of Service</Link>
        </div>

        <div className={styles.reminder}>
          <h2>Quranic Reminder</h2>
          <p>“And say, ‘My Lord, increase me in knowledge.’”</p>
          <span>Quran 20:114</span>
        </div>
      </div>
      <p className={styles.copyright}>© 2025 Nothing But Beauty Portal. All rights reserved.</p>
    </footer>
  );
}

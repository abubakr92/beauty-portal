import Image from "next/image";
import Link from "next/link";
import MainNavigation from "./MainNavigation";
import styles from "./MainHeader.module.css";

export default function MainHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.logo} href="/portal/home" aria-label="Nothing But Beauty home">
          <Image
            src="/shared/brand-logo.svg"
            alt="Nothing But Beauty Portal"
            width={292}
            height={63}
            priority
          />
        </Link>

        <MainNavigation className={styles.desktopNav} ariaLabel="Primary navigation" />

        <div className={styles.actions}>
          <button className={styles.themeButton} type="button" aria-label="Toggle color theme">
            <Image src="/shared/theme-toggle.svg" alt="" width={40} height={40} />
          </button>
          <Link className={styles.signIn} href="/auth/login">
            Sign In
          </Link>
          <Link className={styles.join} href="/portal/join-community">
            Join Waitlist
          </Link>
        </div>

        <details className={styles.mobileMenu}>
          <summary aria-label="Open navigation menu">
            <span />
            <span />
            <span />
          </summary>
          <MainNavigation ariaLabel="Mobile navigation" showAccountLinks />
        </details>
      </div>
    </header>
  );
}

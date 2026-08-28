import Image from "next/image";
import Link from "next/link";
import MainNavigation from "./MainNavigation";
import LogoutLink from "./LogoutLink";
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
          <LogoutLink className={styles.signIn} />
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

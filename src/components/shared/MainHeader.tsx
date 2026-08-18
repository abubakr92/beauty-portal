import Image from "next/image";
import Link from "next/link";
import styles from "./MainHeader.module.css";

const navigation = [
  { label: "Home", href: "/portal/home" },
  { label: "Directory", href: "/portal/directory" },
  { label: "Sanctuary", href: "/portal/sanctuary" },
  { label: "Zehra AI", href: "/portal/zehra-ai" },
  { label: "Events", href: "/portal/events" },
  { label: "Resources", href: "/portal/resources" },
  { label: "About Us", href: "/portal/home#about" },
];

export default function MainHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.logo} href="/portal/home" aria-label="Nothing But Beauty home">
          <Image
            src="/home/brand-logo.svg"
            alt="Nothing But Beauty Portal"
            width={292}
            height={63}
            priority
          />
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link key={item.label} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <button className={styles.themeButton} type="button" aria-label="Toggle color theme">
            <Image src="/home/theme-toggle.svg" alt="" width={40} height={40} />
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
          <nav aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link key={item.label} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/auth/login">Sign In</Link>
            <Link href="/portal/join-community">Join Waitlist</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

import Link from "next/link";
import styles from "../auth.module.css";

export default function SignupHeader({ step }: { step: 1 | 2 | 3 }) {
  return (
    <header className={styles.signupHeader}>
      <h1>Create Your Account</h1>
      <p>Let&apos;s get started! Create your account to join our community.</p>

      <nav className={styles.roleTabs} aria-label="Account type">
        <span>Join as a Member</span>
        <Link href="/portal/join-community">Register as a Business</Link>
      </nav>

      <ol className={styles.steps}>
        {[
          [1, "Account"],
          [2, "Profile"],
          [3, "Interest"],
        ].map(([number, label]) => (
          <li className={number === step ? styles.activeStep : undefined} aria-current={number === step ? "step" : undefined} key={label}>
            <strong>0{number}</strong>
            <span>{label}</span>
          </li>
        ))}
      </ol>
    </header>
  );
}

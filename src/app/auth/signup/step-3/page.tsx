import type { Metadata } from "next";
import Link from "next/link";
import AuthCard from "../../_components/AuthCard";
import InterestForm from "../../_components/InterestForm";
import SignupHeader from "../../_components/SignupHeader";
import styles from "../../auth.module.css";

export const metadata: Metadata = {
  title: "Choose Your Interests | Nothing But Beauty",
  description: "Personalize your Nothing But Beauty member experience.",
};

export default function SignupInterestPage() {
  return (
    <div className={`${styles.screen} ${styles.signupScreen} ${styles.compactScreen}`}>
      <AuthCard variant="signup">
        <SignupHeader step={3} />
        <InterestForm />
        <p className={styles.accountFooter}>Already have an account? <Link href="/auth/login">Log In</Link></p>
      </AuthCard>
    </div>
  );
}

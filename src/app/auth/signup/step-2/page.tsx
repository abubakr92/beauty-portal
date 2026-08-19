import type { Metadata } from "next";
import Link from "next/link";
import AuthCard from "../../_components/AuthCard";
import SignupHeader from "../../_components/SignupHeader";
import SignupProfileForm from "./_components/SignupProfileForm";
import styles from "../../auth.module.css";

export const metadata: Metadata = {
  title: "Create Your Profile | Nothing But Beauty",
  description: "Add the profile details for your Nothing But Beauty member account.",
};

export default function SignupProfilePage() {
  return (
    <div className={`${styles.screen} ${styles.signupScreen}`}>
      <AuthCard variant="signup">
        <SignupHeader step={2} />
        <SignupProfileForm />
        <p className={styles.accountFooter}>Already have an account? <Link href="/auth/login">Log In</Link></p>
      </AuthCard>
    </div>
  );
}

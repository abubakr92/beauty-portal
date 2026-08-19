import type { Metadata } from "next";
import Link from "next/link";
import AuthCard from "../_components/AuthCard";
import AuthField from "../_components/AuthField";
import AuthForm from "../_components/AuthForm";
import PrimaryButton from "../_components/PrimaryButton";
import SocialButtons from "../_components/SocialButtons";
import styles from "../auth.module.css";

export const metadata: Metadata = {
  title: "Sign In | Nothing But Beauty",
  description: "Sign in to your Nothing But Beauty Portal account.",
};

export default function LoginPage() {
  return (
    <div className={styles.screen}>
      <AuthCard title="Welcome back" description="Log in to your account to continue.">
        <AuthForm className={styles.form} nextHref="/portal/home">
          <AuthField autoComplete="email" icon="email" label="Email Address" name="email" type="email" placeholder="Email Address" />
          <AuthField autoComplete="current-password" icon="lock" label="Password" name="password" type="password" placeholder="Password" />
          <Link className={styles.forgotLink} href="/auth/forgot-password">Forgot Password?</Link>
          <PrimaryButton>Continue</PrimaryButton>
          <SocialButtons />
          <p className={styles.accountFooter}>Don&apos;t have an account? <Link href="/auth/signup/step-1">Sign Up</Link></p>
        </AuthForm>
      </AuthCard>
    </div>
  );
}

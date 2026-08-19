import type { Metadata } from "next";
import Link from "next/link";
import AuthCard from "../../_components/AuthCard";
import AuthField from "../../_components/AuthField";
import AuthForm from "../../_components/AuthForm";
import PrimaryButton from "../../_components/PrimaryButton";
import SignupHeader from "../../_components/SignupHeader";
import SocialButtons from "../../_components/SocialButtons";
import styles from "../../auth.module.css";

export const metadata: Metadata = {
  title: "Create Your Account | Nothing But Beauty",
  description: "Create a Nothing But Beauty member account.",
};

export default function SignupAccountPage() {
  return (
    <div className={`${styles.screen} ${styles.signupScreen}`}>
      <AuthCard variant="signup">
        <SignupHeader step={1} />
        <AuthForm className={`${styles.form} ${styles.signupForm}`} nextHref="/auth/signup/step-2">
          <AuthField autoComplete="email" icon="email" label="Email Address" name="email" type="email" placeholder="Email Address" />
          <AuthField autoComplete="new-password" icon="lock" label="Password" name="password" type="password" placeholder="Password" />
          <AuthField autoComplete="new-password" icon="lock" label="Confirm Password" name="confirmPassword" type="password" placeholder="Password" />

          <label className={styles.agreement}>
            <input name="termsAccepted" type="checkbox" required />
            <span>I agree to the <Link href="#terms">Terms of Service</Link> and <Link href="#privacy">Privacy Policy</Link></span>
          </label>

          <PrimaryButton>Continue</PrimaryButton>
          <SocialButtons />
          <p className={styles.accountFooter}>Already have an account? <Link href="/auth/login">Log In</Link></p>
        </AuthForm>
      </AuthCard>
    </div>
  );
}

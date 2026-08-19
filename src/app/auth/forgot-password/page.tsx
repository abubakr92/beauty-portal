import type { Metadata } from "next";
import AuthCard from "../_components/AuthCard";
import AuthField from "../_components/AuthField";
import AuthForm from "../_components/AuthForm";
import PrimaryButton from "../_components/PrimaryButton";
import styles from "../auth.module.css";

export const metadata: Metadata = {
  title: "Forgot Password | Nothing But Beauty",
  description: "Request a verification code to reset your password.",
};

export default function ForgotPasswordPage() {
  return (
    <div className={`${styles.screen} ${styles.compactScreen}`}>
      <AuthCard
        variant="compact"
        title="Forgot Your Password?"
        description={<>Enter your registered email address. We&apos;ll send a one-time<br />verification code (OTP) to reset your password.</>}
      >
        <AuthForm className={`${styles.form} ${styles.compactForm}`} nextHref="/auth/forgot-password/verify-code">
          <AuthField autoComplete="email" icon="email" label="Email Address" name="email" type="email" placeholder="Email Address" />
          <PrimaryButton>Send Code</PrimaryButton>
        </AuthForm>
      </AuthCard>
    </div>
  );
}

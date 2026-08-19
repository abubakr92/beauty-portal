import type { Metadata } from "next";
import AuthCard from "../../_components/AuthCard";
import AuthField from "../../_components/AuthField";
import AuthForm from "../../_components/AuthForm";
import PrimaryButton from "../../_components/PrimaryButton";
import styles from "../../auth.module.css";

export const metadata: Metadata = {
  title: "Create New Password | Nothing But Beauty",
  description: "Create a new password for your Nothing But Beauty account.",
};

export default function ResetPasswordPage() {
  return (
    <div className={`${styles.screen} ${styles.compactScreen}`}>
      <AuthCard
        variant="compact"
        title="Create New Password"
        description={<>OTP verified successfully. Please set a new password for<br />your host account.</>}
      >
        <AuthForm className={`${styles.form} ${styles.compactForm}`} nextHref="/auth/login">
          <AuthField autoComplete="new-password" icon="lock" label="Password" name="password" type="password" placeholder="Password" />
          <AuthField autoComplete="new-password" icon="lock" label="Confirm Password" name="confirmPassword" type="password" placeholder="Password" />
          <PrimaryButton>Create New Password</PrimaryButton>
        </AuthForm>
      </AuthCard>
    </div>
  );
}

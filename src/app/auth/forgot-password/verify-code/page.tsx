import type { Metadata } from "next";
import AuthCard from "../../_components/AuthCard";
import OtpForm from "../../_components/OtpForm";
import styles from "../../auth.module.css";

export const metadata: Metadata = {
  title: "Enter Verification Code | Nothing But Beauty",
  description: "Verify the one-time code sent to your email address.",
};

export default function VerifyCodePage() {
  return (
    <div className={`${styles.screen} ${styles.compactScreen}`}>
      <AuthCard
        variant="compact"
        title="Enter Verification Code"
        description={<>A 6-digit OTP has been sent to user@email.com. Please<br />enter it below to continue.</>}
      >
        <OtpForm />
      </AuthCard>
    </div>
  );
}

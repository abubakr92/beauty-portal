"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "../auth.module.css";
import PrimaryButton from "./PrimaryButton";

const OTP_LENGTH = 6;
const OTP_DURATION = 5 * 60;

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function OtpForm() {
  const router = useRouter();
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [secondsLeft, setSecondsLeft] = useState(OTP_DURATION - 1);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSecondsLeft((currentValue) => Math.max(0, currentValue - 1));
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  function updateDigit(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    setDigits((currentDigits) => currentDigits.map((currentDigit, digitIndex) => digitIndex === index ? digit : currentDigit));
    if (digit && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  }

  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    const pastedDigits = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH).split("");
    if (!pastedDigits.length) return;
    event.preventDefault();
    setDigits(Array.from({ length: OTP_LENGTH }, (_, index) => pastedDigits[index] ?? ""));
    inputRefs.current[Math.min(pastedDigits.length, OTP_LENGTH) - 1]?.focus();
  }

  return (
    <form
      className={styles.otpForm}
      onSubmit={(event) => {
        event.preventDefault();
        router.push("/auth/forgot-password/reset-password");
      }}
    >
      <div className={styles.otpInputs} onPaste={handlePaste}>
        {digits.map((digit, index) => (
          <input
            key={`otp-${index}`}
            ref={(element) => { inputRefs.current[index] = element; }}
            aria-label={`Verification digit ${index + 1}`}
            autoComplete={index === 0 ? "one-time-code" : "off"}
            inputMode="numeric"
            maxLength={1}
            name={`otpDigit${index + 1}`}
            value={digit}
            placeholder={index === 0 ? "2" : "-"}
            onChange={(event) => updateDigit(index, event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Backspace" && !digits[index] && index > 0) inputRefs.current[index - 1]?.focus();
              if (event.key === "ArrowLeft" && index > 0) inputRefs.current[index - 1]?.focus();
              if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
            }}
          />
        ))}
      </div>

      <p className={styles.otpTimer}>Code Expires In: <strong>{formatTime(secondsLeft)}</strong></p>
      <p className={styles.resendLine}>Didn&apos;t Receive The Code? <button type="button" onClick={() => setSecondsLeft(OTP_DURATION)}>Resend OTP</button></p>
      <PrimaryButton>Verify &amp; Continue</PrimaryButton>
      <button className={styles.changeEmail} type="button" onClick={() => router.push("/auth/forgot-password")}>Change Email Address</button>
    </form>
  );
}

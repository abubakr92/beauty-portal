"use client";

import { useRouter } from "next/navigation";
import styles from "../auth.module.css";
import PrimaryButton from "./PrimaryButton";

const interests = [
  "Faith & Spirituality",
  "Business",
  "Parenting",
  "Events",
  "Sisterhood",
  "Wellness",
  "Education",
  "Resources",
] as const;

export default function InterestForm() {
  const router = useRouter();

  return (
    <form
      className={`${styles.form} ${styles.signupForm}`}
      onSubmit={(event) => {
        event.preventDefault();
        router.push("/portal/home");
      }}
    >
      <p className={styles.interestTitle}>Choose your interests.</p>
      <div className={styles.interestGrid}>
        {interests.map((interest) => (
          <label key={interest}>
            <input type="checkbox" name="interests" value={interest} />
            <span>{interest}</span>
          </label>
        ))}
      </div>
      <PrimaryButton>Continue</PrimaryButton>
    </form>
  );
}

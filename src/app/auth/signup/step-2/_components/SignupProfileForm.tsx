"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthField, { AuthSelect } from "../../../_components/AuthField";
import PrimaryButton from "../../../_components/PrimaryButton";
import styles from "../../../auth.module.css";

const cities = ["Birmingham", "Bradford", "Leicester", "London", "Manchester"] as const;
const referralSources = ["A friend or family member", "Instagram", "Facebook", "Google", "An event"] as const;

export default function SignupProfileForm() {
  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState<string>();

  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  return (
    <form
      className={`${styles.form} ${styles.signupForm}`}
      onSubmit={(event) => {
        event.preventDefault();
        router.push("/auth/signup/step-3");
      }}
    >
      <div className={styles.profileUpload}>
        <Image src={previewUrl ?? "/auth/signup/profile-placeholder.png"} alt="Profile preview" width={130} height={130} unoptimized={Boolean(previewUrl)} />
        <label htmlFor="profilePhoto" aria-label="Choose a profile photo">
          <Image src="/auth/signup/profile-edit.png" alt="" width={34} height={34} />
        </label>
        <input
          id="profilePhoto"
          name="profilePhoto"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            setPreviewUrl((currentUrl) => {
              if (currentUrl) URL.revokeObjectURL(currentUrl);
              return URL.createObjectURL(file);
            });
          }}
        />
      </div>

      <AuthField autoComplete="name" icon="user" label="Full Name" name="fullName" placeholder="Full Name" />
      <AuthSelect icon="location" label="City" name="city" placeholder="Enter City Name" options={cities} />
      <AuthSelect optional label="How did you hear about us?" name="referralSource" placeholder="Select an option" options={referralSources} />
      <PrimaryButton>Continue</PrimaryButton>
    </form>
  );
}

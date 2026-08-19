"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const businessTypes = ["Product Based", "Service Based", "Digital", "Non-Profit", "Event / Workshop", "Other"];
const faithOptions = [
  ["Faith-Centered", "/dashboard/profile/faith-centered.svg"],
  ["Women-Led", "/dashboard/profile/women-led.svg"],
  ["Modest & Ethical", "/dashboard/profile/modest-ethical.svg"],
  ["Community Focused", "/dashboard/profile/community-focused.svg"],
] as const;

export default function EditProfileForm() {
  const router = useRouter();
  const [preview, setPreview] = useState("/dashboard/messages/fatima-khan.png");
  const [businessType, setBusinessType] = useState("Service Based");
  const [faithAlignment, setFaithAlignment] = useState(["Faith-Centered", "Women-Led", "Modest & Ethical", "Community Focused"]);
  const [saved, setSaved] = useState(false);

  useEffect(() => () => {
    if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
  }, [preview]);

  function chooseImage(file?: File) {
    if (!file) return;
    setPreview((current) => {
      if (current.startsWith("blob:")) URL.revokeObjectURL(current);
      return URL.createObjectURL(file);
    });
  }

  function toggleFaith(label: string) {
    setFaithAlignment((current) => current.includes(label) ? current.filter((item) => item !== label) : [...current, label]);
  }

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => router.push("/dashboard"), 450);
  }

  return (
    <main className={styles.editPage}>
      <form onSubmit={saveProfile}>
        <header>
          <h1>Edit Profile</h1>
          <div>
            <button className={styles.cancelButton} onClick={() => router.push("/dashboard")} type="button">Cancel</button>
            <button className={styles.saveButton} type="submit">{saved ? "Saved" : "Save"}</button>
          </div>
        </header>

        <div className={styles.formGrid}>
          <section className={styles.personalCard}>
            <label className={styles.photoUpload}>
              <Image src={preview} alt="Profile preview" width={98} height={98} unoptimized={preview.startsWith("blob:")} />
              <Image className={styles.editPhotoIcon} src="/dashboard/profile/edit-photo.svg" alt="" width={36} height={36} />
              <input type="file" accept="image/*" onChange={(event) => chooseImage(event.target.files?.[0])} />
            </label>

            <Field label="Name" defaultValue="Sara Khan" />
            <Field label="Email" defaultValue="abc123@email.com" type="email" />
            <Field label="Phone Number" defaultValue="00123124212" type="tel" />
            <Field label="Business Name" defaultValue="Sara’s Boutique" />
            <SelectField label="Business Category" defaultValue="Beauty" options={["Beauty", "Fashion", "Wellness", "Education"]} />
            <SelectField label="Subcategory (Optional)" defaultValue="Skin Care" options={["Skin Care", "Hair Care", "Makeup", "Modest Fashion"]} />
            <Field label="City / Service Area" defaultValue="Islamabad" />

            <div className={styles.privacyNotice}>
              <span aria-hidden="true">▢</span>
              <p>Your information is secure. We always protect your privacy. Your data will never be shared.</p>
            </div>
          </section>

          <section className={styles.businessCard}>
            <div className={styles.cardHeading}>
              <h2>Business Information</h2>
              <p>Tell us about your business</p>
            </div>

            <label className={styles.field}>
              <span>Business Description</span>
              <textarea defaultValue="Hidayah Beauty is a women-led beauty studio dedicated to helping you look and feel your best. We use high-quality, halal products and offer personalized services for every occasion." />
            </label>
            <Field label="Website (Optional)" defaultValue="www.saraboutique.com" />
            <label className={styles.field}>
              <span className={styles.socialLabel}>Instagram (Optional) <button type="button">Add more socials</button></span>
              <input defaultValue="@saraboutique" />
            </label>

            <fieldset className={styles.chipFieldset}>
              <legend>What best describes your business?</legend>
              <div>
                {businessTypes.map((type) => (
                  <button className={businessType === type ? styles.selectedChip : ""} key={type} onClick={() => setBusinessType(type)} type="button">{type}</button>
                ))}
              </div>
            </fieldset>

            <fieldset className={styles.faithFieldset}>
              <legend>Faith Alignment (Select all that apply)</legend>
              <div>
                {faithOptions.map(([label, icon]) => {
                  const selected = faithAlignment.includes(label);
                  return (
                    <button aria-pressed={selected} className={selected ? styles.selectedFaith : ""} key={label} onClick={() => toggleFaith(label)} type="button">
                      <Image src={icon} alt="" width={16} height={16} /> {label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </section>
        </div>
      </form>
    </main>
  );
}

function Field({ label, defaultValue, type = "text" }: { label: string; defaultValue: string; type?: string }) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <input defaultValue={defaultValue} type={type} />
    </label>
  );
}

function SelectField({ label, defaultValue, options }: { label: string; defaultValue: string; options: string[] }) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <select defaultValue={defaultValue}>{options.map((option) => <option key={option}>{option}</option>)}</select>
    </label>
  );
}

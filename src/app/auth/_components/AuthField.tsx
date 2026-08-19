"use client";

import { useState } from "react";
import styles from "../auth.module.css";

type IconName = "email" | "lock" | "user" | "location";

type AuthFieldProps = {
  autoComplete?: string;
  icon?: IconName;
  label: string;
  name: string;
  optional?: boolean;
  placeholder: string;
  required?: boolean;
  type?: "email" | "password" | "text";
};

function FieldIcon({ icon }: { icon: IconName }) {
  if (icon === "email") {
    return <svg className={styles.fieldIcon} viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
  }

  if (icon === "user") {
    return <svg className={styles.fieldIcon} viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4.5 21c.7-4 3.2-6 7.5-6s6.8 2 7.5 6" /></svg>;
  }

  if (icon === "location") {
    return <svg className={styles.fieldIcon} viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
  }

  return <svg className={styles.fieldIcon} viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /><circle cx="12" cy="15.5" r="1.2" /></svg>;
}

export default function AuthField({
  autoComplete,
  icon,
  label,
  name,
  optional = false,
  placeholder,
  required = true,
  type = "text",
}: AuthFieldProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const inputType = type === "password" && passwordVisible ? "text" : type;

  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>
        {label} {optional && <small>(optional)</small>}
      </span>
      <span className={styles.control}>
        {icon && <FieldIcon icon={icon} />}
        <input
          autoComplete={autoComplete}
          name={name}
          type={inputType}
          placeholder={placeholder}
          required={required}
        />
        {type === "password" && (
          <button
            className={styles.togglePassword}
            type="button"
            aria-label={passwordVisible ? "Hide password" : "Show password"}
            onClick={() => setPasswordVisible((currentValue) => !currentValue)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
              <circle cx="12" cy="12" r="2.6" />
              {!passwordVisible && <path d="m4 3 16 18" />}
            </svg>
          </button>
        )}
      </span>
    </label>
  );
}

type AuthSelectProps = {
  icon?: IconName;
  label: string;
  name: string;
  optional?: boolean;
  placeholder: string;
  options: readonly string[];
};

export function AuthSelect({ icon, label, name, optional, options, placeholder }: AuthSelectProps) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>{label} {optional && <small>(optional)</small>}</span>
      <span className={styles.control}>
        {icon && <FieldIcon icon={icon} />}
        <select name={name} defaultValue="" required={!optional}>
          <option value="" disabled>{placeholder}</option>
          {options.map((option) => <option key={option}>{option}</option>)}
        </select>
        <i className={styles.selectChevron} aria-hidden="true" />
      </span>
    </label>
  );
}

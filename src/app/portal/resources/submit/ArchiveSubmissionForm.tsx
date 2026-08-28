"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./page.module.css";

type ArchiveSubmissionFormProps = {
  children: React.ReactNode;
  className: string;
};

export default function ArchiveSubmissionForm({ children, className }: ArchiveSubmissionFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [draftStatus, setDraftStatus] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!submitted) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSubmitted(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [submitted]);

  function submitAnotherArchive() {
    formRef.current?.reset();
    setSubmitted(false);
    formRef.current?.querySelector<HTMLElement>("input, select, textarea")?.focus();
  }

  return (
    <form
      className={className}
      ref={formRef}
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
      onClick={(event) => {
        const target = event.target as HTMLElement;
        if (!target.closest("[data-save-archive-draft]")) return;
        event.preventDefault();
        const data = Object.fromEntries(new FormData(formRef.current ?? undefined).entries());
        window.sessionStorage.setItem("nbb-archive-draft", JSON.stringify(data));
        setDraftStatus("Archive draft saved for this browser session.");
        window.setTimeout(() => setDraftStatus(""), 2500);
      }}
    >
      {children}

      {draftStatus && <span className={styles.draftStatus} role="status">{draftStatus}</span>}

      {submitted && (
        <div className={styles.successBackdrop}>
          <section
            className={styles.successModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
          >
            <button
              className={styles.modalClose}
              ref={closeButtonRef}
              onClick={() => setSubmitted(false)}
              type="button"
              aria-label="Close confirmation"
            >
              ×
            </button>

            <span className={styles.successIcon} aria-hidden="true">✓</span>
            <p className={styles.successEyebrow}>Submission received</p>
            <h2 id={titleId}>Thank You for Your Submission</h2>
            <p id={descriptionId}>
              Your archive has been received and will be reviewed before appearing in the Resource Library.
            </p>

            <div className={styles.successActions}>
              <Link href="/portal/resources">Back to Resources</Link>
              <button onClick={submitAnotherArchive} type="button">Submit Another Archive</button>
            </div>
          </section>
        </div>
      )}
    </form>
  );
}

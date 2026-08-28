"use client";

import Image from "next/image";
import { createContext, useContext, useRef, useState, type FormEvent, type ReactNode } from "react";
import styles from "./page.module.css";

type SubmissionContextValue = {
  preview: () => void;
  saveDraft: () => void;
};

const SubmissionContext = createContext<SubmissionContextValue | null>(null);

export default function EventSubmissionForm({ children, className }: { children: ReactNode; className: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [dialog, setDialog] = useState<"preview" | "submitted" | null>(null);
  const [preview, setPreview] = useState({ title: "Your Event", organizer: "Your Organization", category: "Event" });
  const [status, setStatus] = useState("");

  function formValues() {
    return Object.fromEntries(new FormData(formRef.current ?? undefined).entries());
  }

  function previewListing() {
    const values = formValues();
    setPreview({
      title: String(values.workshopTitle || "Your Event"),
      organizer: String(values.organizer || "Your Organization"),
      category: String(values.category || "Event"),
    });
    setDialog("preview");
  }

  function saveDraft() {
    window.sessionStorage.setItem("nbb-event-draft", JSON.stringify(formValues()));
    setStatus("Draft saved for this browser session.");
  }

  function submitEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.sessionStorage.removeItem("nbb-event-draft");
    setDialog("submitted");
  }

  return (
    <SubmissionContext.Provider value={{ preview: previewListing, saveDraft }}>
      <form className={className} ref={formRef} onSubmit={submitEvent}>
        {children}
      </form>
      {status && <p className={styles.formStatus} role="status">{status}</p>}
      {dialog && (
        <div className={styles.dialogBackdrop} role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setDialog(null); }}>
          <section className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="event-dialog-title">
            <button className={styles.dialogClose} onClick={() => setDialog(null)} type="button" aria-label="Close dialog">×</button>
            {dialog === "preview" ? (
              <>
                <p className={styles.dialogEyebrow}>Listing Preview</p>
                <h2 id="event-dialog-title">{preview.title}</h2>
                <p>{preview.organizer}</p>
                <span>{preview.category}</span>
                <button className={styles.dialogAction} onClick={() => setDialog(null)} type="button">Continue Editing</button>
              </>
            ) : (
              <>
                <p className={styles.dialogEyebrow}>Payment simulated</p>
                <h2 id="event-dialog-title">Event Submitted</h2>
                <p>Your event has been sent for review. The live payment and approval flow can connect to the backend later.</p>
                <button className={styles.dialogAction} onClick={() => setDialog(null)} type="button">Done</button>
              </>
            )}
          </section>
        </div>
      )}
    </SubmissionContext.Provider>
  );
}

export function EventSubmissionActions() {
  const actions = useContext(SubmissionContext);
  if (!actions) return null;

  return (
    <>
      <button type="submit">Pay $15 &amp; Submit</button>
      <button className={styles.secondaryButton} onClick={actions.preview} type="button"><Image src="/join-community/icon-preview-listing.svg" alt="" width={15} height={15} /> Preview Listing</button>
      <button className={styles.secondaryButton} onClick={actions.saveDraft} type="button"><Image src="/shared/icon-save-draft.svg" alt="" width={15} height={15} /> Save Draft</button>
    </>
  );
}

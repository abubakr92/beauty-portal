"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import styles from "./ModalFrame.module.css";

type ModalFrameProps = {
  title: string;
  children: ReactNode;
  onSave?: () => void;
  saveLabel?: string;
  formId?: string;
};

export default function ModalFrame({ title, children, onSave, saveLabel = "Save", formId }: ModalFrameProps) {
  const router = useRouter();
  const close = () => router.push("/dashboard");

  return (
    <div className={styles.modalLayer} role="presentation">
      <section aria-labelledby="dashboard-modal-title" aria-modal="true" className={styles.modal} role="dialog">
        <header>
          <h1 id="dashboard-modal-title">{title}</h1>
          <button aria-label={`Close ${title}`} className={styles.closeButton} onClick={close} type="button">×</button>
        </header>
        <div className={styles.content}>{children}</div>
        <footer>
          <button className={styles.cancelButton} onClick={close} type="button">Cancel</button>
          <button className={styles.saveButton} form={formId} onClick={formId ? undefined : onSave} type={formId ? "submit" : "button"}>{saveLabel}</button>
        </footer>
      </section>
    </div>
  );
}

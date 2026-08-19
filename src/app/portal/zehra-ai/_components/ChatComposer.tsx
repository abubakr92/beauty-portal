"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import styles from "./ChatComposer.module.css";

function AttachmentIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m20.5 11.5-8.2 8.2a6 6 0 0 1-8.5-8.5l9-9a4 4 0 0 1 5.7 5.6l-9 9a2 2 0 0 1-2.9-2.8l8.3-8.3" />
    </svg>
  );
}

function MicrophoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="8" y="3" width="8" height="13" rx="4" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" />
    </svg>
  );
}

type ChatComposerProps = {
  className?: string;
  disabled?: boolean;
  onSend?: (message: string) => void;
};

export default function ChatComposer({ className, disabled = false, onSend }: ChatComposerProps) {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (onSend && !disabled) {
      inputRef.current?.focus();
    }
  }, [disabled, onSend]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (!onSend) {
      return;
    }

    event.preventDefault();
    const trimmedMessage = message.trim();

    if (!trimmedMessage || disabled) {
      return;
    }

    onSend(trimmedMessage);
    setMessage("");
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  return (
    <form
      className={`${styles.composer}${className ? ` ${className}` : ""}`}
      action="/portal/zehra-ai/chat"
      method="get"
      onSubmit={handleSubmit}
    >
      <button className={styles.attachment} type="button" aria-label="Attach a file" disabled={disabled}>
        <AttachmentIcon />
      </button>

      <div className={styles.inputShell}>
        <label className={styles.visuallyHidden} htmlFor="zehra-message">
          Ask Zehra anything
        </label>
        <input
          ref={inputRef}
          id="zehra-message"
          name="message"
          placeholder="Ask Zehra anything....."
          autoComplete="off"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button className={styles.microphone} type="button" aria-label="Use microphone" disabled={disabled}>
          <MicrophoneIcon />
        </button>
        <button className={styles.send} type="submit" aria-label="Send message" disabled={disabled || !message.trim()}>
          <Image src="/shared/zehra-send.png" alt="" width={40} height={40} />
        </button>
      </div>
    </form>
  );
}

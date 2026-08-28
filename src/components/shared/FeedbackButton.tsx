"use client";

import { useEffect, useRef, useState, type ButtonHTMLAttributes } from "react";
import styles from "./FeedbackButton.module.css";

type FeedbackButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  feedback: string;
};

export default function FeedbackButton({ feedback, onClick, children, ...props }: FeedbackButtonProps) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  function showFeedback() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(true);
    timerRef.current = setTimeout(() => setVisible(false), 2600);
  }

  return (
    <>
      <button
        {...props}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) showFeedback();
        }}
      >
        {children}
      </button>
      {visible && <span className={styles.toast} role="status">{feedback}</span>}
    </>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ChatComposer from "../../_components/ChatComposer";
import ZehraHeading from "../../_components/ZehraHeading";
import { conversation, zehraReplies } from "../../data";
import styles from "../page.module.css";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  message: string;
  time: string;
};

function getCurrentTime() {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date());
}

function ReadReceipt() {
  return (
    <svg viewBox="0 0 22 14" aria-label="Read">
      <path d="m1 7 4 4L14 2M7 7l4 4 9-9" />
    </svg>
  );
}

export default function ZehraChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    conversation.map((entry) => ({ ...entry, id: String(entry.id) })),
  );
  const [isReplying, setIsReplying] = useState(false);
  const conversationRef = useRef<HTMLElement>(null);
  const replyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const conversationElement = conversationRef.current;

    if (conversationElement) {
      conversationElement.scrollTo({ top: conversationElement.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isReplying]);

  useEffect(() => () => {
    if (replyTimerRef.current) {
      clearTimeout(replyTimerRef.current);
    }
  }, []);

  function sendMessage(message: string) {
    const now = getCurrentTime();
    const selectedReply = zehraReplies[Math.floor(Math.random() * zehraReplies.length)];

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: crypto.randomUUID(), role: "user", message, time: now },
    ]);
    setIsReplying(true);

    replyTimerRef.current = setTimeout(() => {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          message: selectedReply,
          time: getCurrentTime(),
        },
      ]);
      setIsReplying(false);
      replyTimerRef.current = null;
    }, 650);
  }

  return (
    <main className={styles.page}>
      <ZehraHeading />

      <section ref={conversationRef} className={styles.conversation} aria-label="Conversation with Zehra AI" aria-live="polite">
        {messages.map((entry) => (
          <article className={entry.role === "user" ? styles.userMessage : styles.assistantMessage} key={entry.id}>
            {entry.role === "assistant" && (
              <Image src="/shared/zehra-avatar.webp" alt="Zehra AI" width={40} height={40} />
            )}
            <div>
              <p>{entry.message}</p>
              <small>{entry.role === "user" && <ReadReceipt />}{entry.time}</small>
            </div>
          </article>
        ))}

        {isReplying && (
          <div className={styles.typingStatus}>
            <Image src="/shared/zehra-avatar.webp" alt="" width={32} height={32} />
            <span>Zehra is typing<span aria-hidden="true">...</span></span>
          </div>
        )}
      </section>

      <ChatComposer className={styles.composer} onSend={sendMessage} disabled={isReplying} />
    </main>
  );
}

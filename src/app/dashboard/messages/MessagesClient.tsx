"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import styles from "./page.module.css";

type Contact = {
  name: string;
  preview: string;
  time: string;
  image: string;
};

type ChatMessage = {
  id: number;
  text: string;
  side: "incoming" | "outgoing";
};

const contacts: Contact[] = [
  { name: "Sara Jarwo", preview: "Refer friends. Get rewards.", time: "1m", image: "/dashboard/messages/sara-jarwo.png" },
  { name: "Iqra Iqbal", preview: "I will purchase it for sure. 👍", time: "8m", image: "/dashboard/messages/iqra-iqbal.png" },
  { name: "Ayesha Khan", preview: "If it takes long you can mail...", time: "30m", image: "/dashboard/messages/ayesha-khan.png" },
  { name: "Sana Malik", preview: "Send a photo", time: "2d", image: "/dashboard/messages/sana-malik.png" },
  { name: "Fatima Khan", preview: "Send a photo", time: "3d", image: "/dashboard/messages/fatima-khan.png" },
  { name: "Sara Khan", preview: "Send a video", time: "4w", image: "/dashboard/messages/iqra-iqbal.png" },
];

const openingMessages: ChatMessage[] = [
  { id: 1, side: "incoming", text: "Assalamu Alaikum, sister! 🌸" },
  { id: 2, side: "outgoing", text: "Wa Alaikum Assalam wa Rahmatullahi wa Barakatuh. How are you today?" },
  { id: 3, side: "incoming", text: "MashaAllah, may Allah accept it and make it a source of light for you." },
  { id: 4, side: "outgoing", text: "Ameen. 🙌 How has your day been?" },
  { id: 5, side: "incoming", text: "It's been a little overwhelming, but Alhamdulillah. I've been trying to stay consistent with my morning adhkar." },
];

const initialChats = Object.fromEntries(
  contacts.map((_, contactIndex) => [
    contactIndex,
    openingMessages.map((message) => ({ ...message, id: contactIndex * 100 + message.id })),
  ]),
) as Record<number, ChatMessage[]>;

export default function MessagesClient() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [chats, setChats] = useState(initialChats);
  const [draft, setDraft] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [moreOpen, setMoreOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeContact = contacts[activeIndex];
  const messages = chats[activeIndex];
  const visibleMessages = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return query ? messages.filter((message) => message.text.toLowerCase().includes(query)) : messages;
  }, [messages, searchQuery]);

  function selectContact(index: number) {
    setActiveIndex(index);
    setDraft("");
    setSearchQuery("");
    setSearchOpen(false);
    setMoreOpen(false);
    setNotice(`Conversation changed to ${contacts[index].name}`);
    requestAnimationFrame(() => {
      if (messagesRef.current) messagesRef.current.scrollTop = 0;
      inputRef.current?.focus();
    });
  }

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice((current) => current === message ? "" : current), 2400);
  }

  function addAttachment(event: ChangeEvent<HTMLInputElement>, kind: "Image" | "File") {
    const file = event.target.files?.[0];
    if (!file) return;
    setChats((current) => ({
      ...current,
      [activeIndex]: [...current[activeIndex], { id: Date.now(), text: `${kind === "Image" ? "🖼️" : "📎"} ${file.name}`, side: "outgoing" }],
    }));
    event.target.value = "";
    showNotice(`${kind} attached to the conversation`);
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setChats((current) => ({
      ...current,
      [activeIndex]: [...current[activeIndex], { id: Date.now(), text, side: "outgoing" }],
    }));
    setDraft("");
    requestAnimationFrame(() => {
      inputRef.current?.focus();
      messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" });
    });
  }

  return (
    <div className={styles.messagingLayout}>
      <aside className={styles.contactList} aria-label="Conversations">
        {contacts.map((contact, index) => (
          <button
            className={index === activeIndex ? styles.activeContact : ""}
            key={contact.name}
            onClick={() => selectContact(index)}
            aria-pressed={index === activeIndex}
            type="button"
          >
            <Image src={contact.image} alt="" width={50} height={50} />
            <span>
              <strong>{contact.name}</strong>
              <small>{contact.preview}</small>
            </span>
            <time>{contact.time}</time>
          </button>
        ))}
      </aside>

      <section className={styles.chatPanel}>
        <header className={styles.chatHeader}>
          <div>
            <Image src={activeContact.image} alt="" width={50} height={50} />
            <strong>{activeContact.name}</strong>
            <i aria-label="Online" />
          </div>
          <nav aria-label="Conversation actions">
            <button aria-pressed={searchOpen} onClick={() => { setSearchOpen((current) => !current); setMoreOpen(false); }} type="button" aria-label="Search conversation"><Image src="/dashboard/messages/search.svg" alt="" width={24} height={24} /></button>
            <button onClick={() => showNotice(`Calling ${activeContact.name}...`)} type="button" aria-label="Start audio call"><Image src="/dashboard/messages/call.svg" alt="" width={24} height={24} /></button>
            <button onClick={() => showNotice(`Starting video call with ${activeContact.name}...`)} type="button" aria-label="Start video call"><Image src="/dashboard/messages/video.svg" alt="" width={24} height={24} /></button>
            <button aria-expanded={moreOpen} onClick={() => setMoreOpen((current) => !current)} type="button" aria-label="More actions"><Image src="/dashboard/messages/more.svg" alt="" width={24} height={24} /></button>
            {moreOpen && (
              <div className={styles.moreMenu}>
                <button onClick={() => { showNotice("Conversation marked as unread"); setMoreOpen(false); }} type="button">Mark as unread</button>
                <button onClick={() => { setChats((current) => ({ ...current, [activeIndex]: [] })); setMoreOpen(false); }} type="button">Clear conversation</button>
              </div>
            )}
          </nav>
        </header>

        <div className={styles.messages} aria-live="polite" ref={messagesRef}>
          {notice && <p className={styles.chatNotice} role="status">{notice}</p>}
          {searchOpen && (
            <label className={styles.messageSearch}>
              <span>Search this conversation</span>
              <input autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Type a word or phrase..." type="search" />
            </label>
          )}
          <time>02 January 2024 - 04:56 PM</time>
          {visibleMessages.length ? visibleMessages.map((message) => (
            <div className={styles[message.side]} key={message.id}>
              {message.side === "incoming" && <Image src={activeContact.image} alt="" width={48} height={48} />}
              <p>{message.text}</p>
            </div>
          )) : (
            <p className={styles.emptyChat}>{searchQuery ? "No messages match your search." : `Start a conversation with ${activeContact.name}.`}</p>
          )}
        </div>

        <form className={styles.composer} onSubmit={sendMessage}>
          <button onClick={() => { setDraft((current) => `${current}🌸`); inputRef.current?.focus(); }} type="button" aria-label="Add emoji"><Image src="/dashboard/messages/emoji.svg" alt="" width={24} height={24} /></button>
          <button onClick={() => imageInputRef.current?.click()} type="button" aria-label="Add image"><Image src="/dashboard/messages/gallery.svg" alt="" width={24} height={24} /></button>
          <button onClick={() => fileInputRef.current?.click()} type="button" aria-label="Attach file"><Image src="/dashboard/messages/attachment.svg" alt="" width={24} height={24} /></button>
          <input ref={inputRef} value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Send Your Message ..." aria-label="Message" />
          <button type="submit" aria-label="Send message"><Image src="/dashboard/messages/send.svg" alt="" width={24} height={24} /></button>
          <input ref={imageInputRef} className={styles.hiddenInput} accept="image/*" onChange={(event) => addAttachment(event, "Image")} type="file" />
          <input ref={fileInputRef} className={styles.hiddenInput} onChange={(event) => addAttachment(event, "File")} type="file" />
        </form>
      </section>
    </div>
  );
}

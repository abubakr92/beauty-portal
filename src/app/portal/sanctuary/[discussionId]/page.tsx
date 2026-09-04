"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { sanctuaryCategories, sanctuaryPosts } from "../data";
import styles from "./page.module.css";

type CreatedDiscussion = { id: string; title: string; body: string; category: string; identity: string; anonymousHandle: string; tags: string[] };
type Reply = { id: number; author: string; body: string; age: string };

export default function DiscussionPage() {
  const params = useParams<{ discussionId: string }>();
  const [created, setCreated] = useState<CreatedDiscussion | null>(null);
  const [restored, setRestored] = useState(false);
  const [replies, setReplies] = useState<Reply[]>([
    { id: 1, author: "Sister Hana", body: "JazakAllahu khayran for opening this conversation. Small, consistent steps and a supportive circle have helped me most.", age: "2 hours ago" },
    { id: 2, author: "Sister Amina", body: "I relate to this deeply. Giving myself grace while returning to simple routines made the biggest difference.", age: "1 hour ago" },
  ]);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = sessionStorage.getItem("sanctuary:new-discussion");
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as CreatedDiscussion;
          if (parsed.id === params.discussionId) setCreated(parsed);
        } catch {
          sessionStorage.removeItem("sanctuary:new-discussion");
        }
      }
      setRestored(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [params.discussionId]);

  const staticPost = sanctuaryPosts.find((post) => post.id === params.discussionId) ?? sanctuaryPosts[0];
  const category = created ? sanctuaryCategories.find((item) => item.slug === created.category)?.label ?? "Community" : staticPost.category;
  const author = created ? (created.identity === "anonymous" ? created.anonymousHandle : "Zehra Ahmed") : staticPost.author;
  const title = created?.title || staticPost.title;
  const body = created?.body || staticPost.excerpt;
  const avatar = created?.identity === "anonymous" ? "/sanctuary/anonymous-avatar.png" : staticPost.avatar;
  const isCreated = Boolean(created);
  const expectsCreatedDiscussion = params.discussionId.startsWith("discussion-");
  const replyCount = useMemo(() => replies.length, [replies]);

  function addReply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = String(form.get("reply") ?? "").trim();
    if (!message) return;
    setReplies((current) => [...current, { id: Date.now(), author: "Zehra Ahmed", body: message, age: "Just now" }]);
    event.currentTarget.reset();
  }

  if (expectsCreatedDiscussion && !restored) return <main className={styles.page}><div className={styles.shell}><p className={styles.routeMessage}>Loading discussion…</p></div></main>;
  if (expectsCreatedDiscussion && !created) return <main className={styles.page}><div className={styles.shell}><div className={styles.routeMessage}><h1>Discussion not found</h1><p>This draft discussion is no longer available in this browser session.</p><Link href="/portal/sanctuary">Return to Sanctuary</Link></div></div></main>;

  return <main className={styles.page}><div className={styles.shell}>
    <Link className={styles.back} href="/portal/sanctuary">← Back to Sanctuary</Link>
    {isCreated && <div className={styles.confirmation} role="status">✓ Your discussion has been posted.</div>}
    <article className={styles.discussion}>
      <div className={styles.author}><Image src={avatar} alt="" width={54} height={54} /><div><strong>{author}</strong>{created?.identity === "anonymous" && <span>Original Poster</span>}<p>Just now · in {category}</p></div></div>
      <h1>{title}</h1><p className={styles.body}>{body}</p>
      {created?.tags?.length ? <div className={styles.tags}>{created.tags.map((tag) => <span key={tag}>{tag}</span>)}</div> : null}
      <div className={styles.actions}><button aria-pressed={liked} onClick={() => setLiked((current) => !current)} type="button">♡ {staticPost.likes + (liked ? 1 : 0)}</button><span>○ {replyCount} replies</span><button onClick={() => void navigator.clipboard?.writeText(window.location.href)} type="button">Share</button></div>
    </article>
    <section className={styles.replies}><h2>{replyCount} Replies</h2>{replies.map((reply) => <article key={reply.id}><div><strong>{reply.author}</strong><time>{reply.age}</time></div><p>{reply.body}</p></article>)}</section>
    <form className={styles.replyForm} onSubmit={addReply}><label htmlFor="reply">Join the discussion</label><textarea id="reply" name="reply" placeholder="Write a thoughtful reply..." required rows={4} /><button type="submit">Post Reply</button></form>
  </div></main>;
}

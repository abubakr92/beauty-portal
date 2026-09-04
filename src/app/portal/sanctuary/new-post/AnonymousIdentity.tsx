"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./page.module.css";

const handles = ["Sister_Rose_42", "Sister_Noor_18", "Sister_Lily_27", "Sister_Sabr_91", "Sister_Dua_63"];

export default function AnonymousIdentity() {
  const [anonymous, setAnonymous] = useState(false);
  const [handleIndex, setHandleIndex] = useState(0);

  return (
    <fieldset className={styles.identityCard}>
      <legend>How would you like to post?</legend>
      <div className={styles.identityChoices}>
        <label><input checked={!anonymous} name="identity" onChange={() => setAnonymous(false)} type="radio" value="profile" /><span><strong>Post with my profile</strong><small>Your name and profile photo will appear.</small></span></label>
        <label><input checked={anonymous} name="identity" onChange={() => setAnonymous(true)} type="radio" value="anonymous" /><span><strong>Post anonymously</strong><small>Your profile details stay private.</small></span></label>
      </div>
      {anonymous && <div className={styles.identityHeader}>
        <Image src="/sanctuary/anonymous-avatar.png" alt="" width={42} height={42} />
        <div><h2>{handles[handleIndex]}</h2><p>This name remains with your discussion and replies. You&apos;ll be marked as the Original Poster.</p></div>
        <button onClick={() => setHandleIndex((current) => (current + 1) % handles.length)} type="button"><span aria-hidden="true">↻</span>Generate another name</button>
      </div>}
      <input name="anonymousHandle" type="hidden" value={anonymous ? handles[handleIndex] : ""} />
    </fieldset>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./page.module.css";

const handles = ["Sister_Rose_42", "Sister_Noor_18", "Sister_Lily_27", "Sister_Sabr_91", "Sister_Dua_63"];

export default function AnonymousIdentity() {
  const [handleIndex, setHandleIndex] = useState(0);

  function regenerateHandle() {
    setHandleIndex((current) => (current + 1) % handles.length);
  }

  return (
    <section className={styles.identityCard} aria-labelledby="anonymous-heading">
      <div className={styles.identityHeader}>
        <Image src="/sanctuary/anonymous-avatar.png" alt="" width={42} height={42} />
        <div>
          <h2 id="anonymous-heading">{handles[handleIndex]}</h2>
          <p>Your anonymous handle</p>
        </div>
        <button onClick={regenerateHandle} type="button" aria-label="Generate a new anonymous handle">
          <span aria-hidden="true">↻</span>
          Regenerate
        </button>
      </div>
      <label className={styles.toggleRow}>
        <span>Post anonymously</span>
        <input type="checkbox" name="anonymous" value="true" defaultChecked />
        <i aria-hidden="true" />
      </label>
      <input name="anonymousHandle" type="hidden" value={handles[handleIndex]} />
    </section>
  );
}

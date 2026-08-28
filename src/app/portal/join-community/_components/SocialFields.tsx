"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "../page.module.css";

const additionalNetworks = ["Facebook", "LinkedIn", "TikTok"];

export default function SocialFields() {
  const [visibleCount, setVisibleCount] = useState(0);

  return (
    <div className={styles.socialField} id="socials">
      <button disabled={visibleCount === additionalNetworks.length} onClick={() => setVisibleCount((current) => Math.min(additionalNetworks.length, current + 1))} type="button">
        {visibleCount === additionalNetworks.length ? "All socials added" : "Add more socials"}
      </button>
      <label className={styles.field}>
        <span>Instagram Handle <small> (Optional)</small></span>
        <div><Image src="/join-community/icon-instagram.svg" alt="" width={22} height={22} /><input name="instagram" placeholder="@yourusername" /></div>
      </label>
      {additionalNetworks.slice(0, visibleCount).map((network) => (
        <label className={styles.field} key={network}>
          <span>{network} <small> (Optional)</small></span>
          <div><input name={network.toLowerCase()} placeholder={`${network} profile or handle`} /></div>
        </label>
      ))}
    </div>
  );
}

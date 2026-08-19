"use client";

import Image from "next/image";
import { useState } from "react";
import BackLink from "../_components/BackLink";
import dashboardStyles from "../dashboard.module.css";
import styles from "./page.module.css";

type SavedItem = {
  id: number;
  tier: "gold" | "emerald";
  name: string;
  image: string;
};

const initialItems: SavedItem[] = [
  { id: 1, tier: "gold", name: "Zahra Beauty Studio", image: "/dashboard/saved/product-gold.png" },
  { id: 2, tier: "emerald", name: "Mindful Moments", image: "/dashboard/gallery/image-2.png" },
  { id: 3, tier: "emerald", name: "Mindful Moments", image: "/dashboard/gallery/image-5.png" },
  { id: 4, tier: "gold", name: "Zahra Beauty Studio", image: "/dashboard/saved/product-gold.png" },
  { id: 5, tier: "gold", name: "Zahra Beauty Studio", image: "/dashboard/saved/product-gold.png" },
  { id: 6, tier: "gold", name: "Zahra Beauty Studio", image: "/dashboard/saved/product-gold.png" },
  { id: 7, tier: "emerald", name: "Mindful Moments", image: "/dashboard/gallery/image-8.png" },
];

export default function SavedItemsPage() {
  const [items, setItems] = useState(initialItems);

  return (
    <main className={`${dashboardStyles.standardPage} ${styles.savedPage}`}>
      <div className={dashboardStyles.pageTopline}>
        <div>
          <BackLink />
          <h1 className={dashboardStyles.pageTitle}>Saved Items</h1>
        </div>
        <select className={dashboardStyles.periodSelect} aria-label="Saved items date range" defaultValue="30">
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="all">All Time</option>
        </select>
      </div>

      <section className={styles.savedGrid} aria-label="Saved businesses">
        {items.map((item) => (
          <article key={item.id}>
            <div className={styles.cardImage}>
              <Image src={item.image} alt="" width={570} height={360} />
              <button aria-label={`Remove ${item.name} from saved items`} onClick={() => setItems((current) => current.filter((saved) => saved.id !== item.id))} type="button">♥</button>
            </div>
            <div className={styles.cardBody}>
              <span className={styles.membership} data-tier={item.tier}>
                <Image src={`/dashboard/saved/crown-${item.tier}.svg`} alt="" width={13} height={11} />
                {item.tier === "gold" ? "Gold Member" : "Emerald Member"}
              </span>
              <h2>{item.name}</h2>
              <p>Beauty &amp; Skincare</p>
              <p><Image src="/shared/icon-location.svg" alt="" width={13} height={13} /> North York, ON</p>
              <p><b>★</b> 5.0 <small>(24 reviews)</small></p>
            </div>
          </article>
        ))}
        {!items.length && <p className={styles.empty}>You have no saved businesses yet.</p>}
      </section>
    </main>
  );
}

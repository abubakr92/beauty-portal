"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import FeedbackButton from "@/components/shared/FeedbackButton";
import {
  businessListings,
  categoryFilters,
  cities,
  featuredBusinesses,
  topRatedBusinesses,
  trendingCategories,
} from "./data";
import styles from "./page.module.css";

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <span className={styles.rating} aria-label={`${rating} out of 5, ${reviews} reviews`}>
      <Image src="/directory/icon-listing-rating.svg" alt="" width={16} height={16} />
      {rating.toFixed(1)} ({reviews})
    </span>
  );
}

export default function BusinessDirectoryPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [location, setLocation] = useState("all");
  const [pricing, setPricing] = useState("all");
  const [featured, setFeatured] = useState("all");
  const [sort, setSort] = useState("recommended");
  const [visibleCount, setVisibleCount] = useState(4);

  const filteredBusinesses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const categoryMap: Record<string, string[]> = {
      Wellness: ["Beauty & Skincare"],
      "Fashion/Clothing": ["Home & Decor"],
      Education: ["Education"],
      Shops: ["Home & Decor", "Photography"],
      Prayer: ["Education"],
    };

    const results = businessListings.filter((business, index) => {
      const matchesQuery = !normalizedQuery || `${business.name} ${business.description} ${business.category} ${business.location}`.toLowerCase().includes(normalizedQuery);
      const mappedCategories = categoryMap[category];
      const matchesCategory = category === "All Categories" || mappedCategories?.includes(business.category);
      const matchesLocation = location === "all" || business.location.toLowerCase().includes(location.toLowerCase());
      const matchesFeatured = featured === "all" || (featured === "featured" ? index < 2 : index >= 2);
      const matchesPricing = pricing === "all" || (pricing === "budget" ? index % 2 === 0 : index % 2 === 1);
      return matchesQuery && matchesCategory && matchesLocation && matchesFeatured && matchesPricing;
    });

    return [...results].sort((first, second) => {
      if (sort === "rating") return second.rating - first.rating;
      if (sort === "name") return first.name.localeCompare(second.name);
      return 0;
    });
  }, [category, featured, location, pricing, query, sort]);

  function applySearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setVisibleCount(4);
    document.getElementById("all-businesses")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function chooseCategory(nextCategory: string) {
    setCategory(nextCategory);
    setVisibleCount(4);
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="directory-title">
        <div className={styles.heroIntro}>
          <p>FAITH. SISTERHOOD. PURPOSE.</p>
          <h1 id="directory-title">Business Directory</h1>
          <span>Discover women-owned businesses, services, and resources aligned with your values.</span>
        </div>

        <blockquote className={styles.heroQuote}>
          <span className={styles.quoteMark}>“</span>
          <p>The truthful and trustworthy merchant will be with the Prophets, the truthful, and the martyrs.</p>
          <cite>— Jami&apos; at-Tirmidhi 1209</cite>
          <span className={styles.quoteRule} aria-hidden="true">✦</span>
        </blockquote>
      </section>

      <section className={styles.directoryShell} aria-label="Browse businesses">
        <div className={styles.directoryMain}>
          <form className={styles.searchFilters} onSubmit={applySearch}>
            <label className={styles.searchBox}>
              <span className={styles.searchIcon} aria-hidden="true" />
              <span className={styles.visuallyHidden}>Search businesses</span>
              <input name="query" onChange={(event) => setQuery(event.target.value)} value={query} type="search" placeholder="Search businesses, services, or keywords..." />
            </label>

            <div className={styles.categoryPills} aria-label="Business categories">
              {categoryFilters.map((categoryLabel, index) => (
                <button aria-pressed={category === categoryLabel} className={category === categoryLabel ? styles.activePill : styles.categoryPill} key={`${categoryLabel}-${index}`} onClick={() => chooseCategory(categoryLabel)} type="button">
                  {index === 0 && <Image src="/shared/icon-category-grid.svg" alt="" width={16} height={16} />}
                  {categoryLabel}
                </button>
              ))}
            </div>

            <div className={styles.selectFilters}>
              <label>
                <span className={styles.visuallyHidden}>Category</span>
                <select aria-label="Category" name="category" onChange={(event) => chooseCategory(event.target.value)} value={category}>
                  {categoryFilters.filter((item, index) => categoryFilters.indexOf(item) === index).map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label>
                <span className={styles.visuallyHidden}>Location type</span>
                <select name="location" onChange={(event) => { setLocation(event.target.value); setVisibleCount(4); }} value={location}>
                  <option value="all">Location Type</option>
                  <option value="Islamabad">Islamabad, PK</option>
                  <option value="Toronto">Toronto, CA</option>
                </select>
              </label>
              <label>
                <span className={styles.visuallyHidden}>Pricing range</span>
                <select name="pricing" onChange={(event) => setPricing(event.target.value)} value={pricing}>
                  <option value="all">Pricing Range</option>
                  <option value="budget">Budget Friendly</option>
                  <option value="premium">Premium</option>
                </select>
              </label>
              <label>
                <span className={styles.visuallyHidden}>Listing type</span>
                <select name="featured" onChange={(event) => setFeatured(event.target.value)} value={featured}>
                  <option value="all">Featured Listing</option>
                  <option value="featured">Featured</option>
                  <option value="standard">Standard</option>
                </select>
              </label>
              <label>
                <span className={styles.visuallyHidden}>Sort businesses</span>
                <select name="sort" onChange={(event) => setSort(event.target.value)} value={sort}>
                  <option value="recommended">Recommended</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name A–Z</option>
                </select>
              </label>
            </div>
          </form>

          <section className={styles.businessSection} aria-labelledby="featured-businesses">
            <h2 id="featured-businesses">Featured Businesses</h2>
            <div className={styles.featuredGrid}>
              {featuredBusinesses.map((business) => (
                <Link className={styles.featuredCard} href={`/portal/directory/${business.id}`} key={business.id}>
                  <Image src={business.image} alt="" fill sizes="(max-width: 740px) 100vw, 30vw" />
                  <div className={styles.featuredDetails}>
                    <Image src={business.avatar} alt="" width={44} height={44} />
                    <div>
                      <h3>{business.name}</h3>
                      <div className={styles.featuredMeta}>
                        <span>{business.category}</span>
                        <StarRating rating={business.rating} reviews={business.reviews} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className={styles.businessSection} aria-labelledby="all-businesses">
            <h2 id="all-businesses">All Businesses</h2>
            <div className={styles.businessGrid}>
              {filteredBusinesses.slice(0, visibleCount).map((business) => (
                <article className={styles.businessCard} key={business.id}>
                  <div className={styles.businessSummary}>
                    <div className={styles.businessImage}>
                      <Image src={business.image} alt="" fill sizes="(max-width: 740px) 100vw, 210px" />
                    </div>
                    <div className={styles.businessCopy}>
                      <h3>{business.name}</h3>
                      <p>{business.description}</p>
                      <span className={styles.categoryTag}>{business.category}</span>
                      <span className={styles.location}>
                        <Image src="/shared/icon-location.svg" alt="" width={16} height={16} />
                        {business.location}
                      </span>
                      <StarRating rating={business.rating} reviews={business.reviews} />
                    </div>
                  </div>
                  <div className={styles.businessActions}>
                    <Link href={`/portal/directory/${business.id}`}>View Profile</Link>
                    {business.website === "#" ? (
                      <FeedbackButton feedback={`Website for ${business.name} will open here once connected.`} type="button">Visit Website</FeedbackButton>
                    ) : <a href={business.website}>Visit Website</a>}
                  </div>
                </article>
              ))}
            </div>
            {!filteredBusinesses.length && <p className={styles.emptyResults}>No businesses match these filters. Try another category or location.</p>}
            {visibleCount < filteredBusinesses.length && (
              <button className={styles.loadMore} onClick={() => setVisibleCount((current) => current + 2)} type="button">
                Load More Businesses <span aria-hidden="true">⌄</span>
              </button>
            )}
          </section>
        </div>

        <aside className={styles.sidebar} aria-label="Directory highlights">
          <section className={styles.sidebarCard}>
            <h2><Image src="/shared/icon-trending.svg" alt="" width={24} height={24} /> Trending Categories</h2>
            <ul className={styles.trendingList}>
              {trendingCategories.map((category) => (
                <li key={category.name}><span>{category.name}</span><strong>{category.count}</strong></li>
              ))}
            </ul>
            <a href="#all-businesses">View all categories</a>
          </section>

          <section className={styles.sidebarCard}>
            <h2><Image src="/directory/icon-top-rated.svg" alt="" width={24} height={24} /> Top Rated Business</h2>
            <ul className={styles.topRatedList}>
              {topRatedBusinesses.map((business) => (
                <li key={business.name}>
                  <Image src={business.avatar} alt="" width={44} height={44} />
                  <div><span>{business.name}</span><small>5.0 (20) &nbsp;|&nbsp; ☆ 5.0 (20)</small></div>
                </li>
              ))}
            </ul>
            <Link href="/portal/directory/nour-hamza-bakery">View all top rated</Link>
          </section>

          <section className={styles.sidebarCard}>
            <h2><Image src="/directory/icon-city.svg" alt="" width={18} height={22} /> Explore By City</h2>
            <div className={styles.cityGrid}>
              {cities.map((city) => <button aria-pressed={location === city} key={city} onClick={() => { setLocation(city); setVisibleCount(4); document.getElementById("all-businesses")?.scrollIntoView({ behavior: "smooth" }); }} type="button">{city}</button>)}
            </div>
            <a href="#all-businesses">View all cities</a>
          </section>

          <section className={styles.memberCard}>
            <h2>Become a Business Member</h2>
            <p>Claim your profile, connect, and reach thousands of women in our community.</p>
            <Link href="/portal/join-community">Get Your Business</Link>
          </section>
        </aside>
      </section>
    </main>
  );
}

"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import BackLink from "../_components/BackLink";
import dashboardStyles from "../dashboard.module.css";
import styles from "./page.module.css";

type Period = "7" | "30" | "90";

const overview = [
  { label: "Profile Views", value: 1247, change: "+12.4% vs last month", direction: "up", icon: "/dashboard/analytics/profile-views.svg" },
  { label: "Search Appearances", value: 856, change: "+8.2% vs last month", direction: "up", icon: "/dashboard/analytics/search-appearances.svg" },
  { label: "Website Clicks", value: 324, change: "+18.5% vs last month", direction: "up", icon: "/dashboard/analytics/website-clicks.svg" },
  { label: "Messages", value: 48, change: "-3.1% vs last month", direction: "down", icon: "/dashboard/analytics/messages.svg" },
] as const;

const baseChart = [
  ["W2", 211], ["W3", 212], ["W4", 213], ["W5", 214], ["W6", 215], ["W7", 216], ["W8", 217],
  ["W9", 218], ["W10", 219], ["W11", 220], ["W12", 221], ["W13", 222], ["W14", 223], ["W15", 224],
] as const;

const periodScale: Record<Period, number> = { "7": 0.28, "30": 1, "90": 2.9 };

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>("30");
  const [activePoint, setActivePoint] = useState<{ label: string; value: number } | null>(null);
  const scale = periodScale[period];

  const chart = useMemo(() => {
    const source = period === "7" ? baseChart.slice(-7) : baseChart;
    return source.map(([label, value], index) => ({
      label,
      value: Math.round(value * scale),
      height: 45 + ((index * 23 + ((index * 17) % 43) - 18) % 88),
    }));
  }, [period, scale]);

  return (
    <main className={`${dashboardStyles.standardPage} ${styles.analyticsPage}`}>
      <div className={dashboardStyles.pageTopline}>
        <div>
          <BackLink />
          <h1 className={dashboardStyles.pageTitle}>Performance Overview</h1>
        </div>
        <select
          className={dashboardStyles.periodSelect}
          aria-label="Analytics date range"
          onChange={(event) => {
            setPeriod(event.target.value as Period);
            setActivePoint(null);
          }}
          value={period}
        >
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 90 Days</option>
        </select>
      </div>

      <section className={styles.overviewGrid} aria-label="Performance summary">
        {overview.map((item) => (
          <article key={item.label} tabIndex={0}>
            <Image src={item.icon} alt="" width={24} height={24} />
            <span>{item.label}</span>
            <strong>{Math.round(item.value * scale).toLocaleString()}</strong>
            <small data-direction={item.direction}>{item.direction === "up" ? "↑" : "↓"} {item.change}</small>
            <div className={styles.metricTooltip}>{item.label} during the selected period</div>
          </article>
        ))}
      </section>

      <section className={styles.chartCard}>
        <div className={styles.chartHeading}>
          <h2>Views Over Time</h2>
          <p aria-live="polite">
            {activePoint ? <><strong>{activePoint.value}</strong> views in {activePoint.label}</> : "Hover or focus a bar to see its value"}
          </p>
        </div>
        <div className={styles.chart}>
          {chart.map((point) => (
            <div className={styles.chartColumn} key={point.label}>
              <button
                aria-label={`${point.label}: ${point.value} profile views`}
                onBlur={() => setActivePoint(null)}
                onClick={() => setActivePoint(point)}
                onFocus={() => setActivePoint(point)}
                onMouseEnter={() => setActivePoint(point)}
                onMouseLeave={() => setActivePoint(null)}
                type="button"
              >
                <span className={styles.bar} style={{ height: point.height }} />
                <span className={styles.barTooltip}><b>{point.value}</b> views</span>
              </button>
              <small>{point.label}</small>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

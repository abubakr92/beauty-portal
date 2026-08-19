import Image from "next/image";
import Link from "next/link";
import {
  currentBusiness,
  dashboardMetrics,
  membershipThemes,
  quickActions,
  recentActivity,
} from "../data";
import styles from "../dashboard.module.css";

type DashboardHomeProps = {
  muted?: boolean;
};

export default function DashboardHome({ muted = false }: DashboardHomeProps) {
  const membership = membershipThemes[currentBusiness.membershipTier];

  return (
    <main className={`${styles.dashboardHome} ${muted ? styles.mutedDashboard : ""}`}>
      <section className={styles.dashboardHero}>
        <div className={styles.heroCopy}>
          <p>Assalam o Alaikum,</p>
          <h1>Sister {currentBusiness.ownerName}</h1>
          <span>Welcome back to your dashboard.</span>

          <div className={styles.membershipCard} data-tier={currentBusiness.membershipTier}>
            <div className={styles.membershipIdentity}>
              <Image
                className={styles.membershipIcon}
                src="/dashboard/shared/emerald-membership.png"
                alt=""
                width={48}
                height={48}
              />
              <div>
                <strong>{membership.label}</strong>
                <small>Member since {currentBusiness.memberSince}</small>
              </div>
            </div>
            <Link href="/portal/join-community">View Benefits</Link>
          </div>
        </div>
      </section>

      <section className={styles.dashboardPanel}>
        <div className={styles.hostingNotice}>
          <Image src="/shared/info.svg" alt="" width={24} height={24} />
          <span>This system is hosted on external platforms such as Google Drive, Dropbox, or other external locations.</span>
        </div>

        <div className={styles.dashboardGrid}>
          <div className={styles.dashboardPrimary}>
            <section className={styles.profileOverview}>
              <div className={styles.sectionHeading}>
                <h2>Profile Overview</h2>
                <Link href="/portal/directory/hijab-beautique">View Profile</Link>
              </div>
              <div className={styles.profileCard}>
                <div className={styles.profileIdentity}>
                  <div className={styles.businessInitials}>{currentBusiness.initials}</div>
                  <div>
                    <h3>{currentBusiness.businessName}</h3>
                    <span className={styles.tierBadge} data-tier={currentBusiness.membershipTier}>
                      <Image src="/dashboard/shared/membership-crown.svg" alt="" width={10} height={10} />
                      {membership.shortLabel}
                    </span>
                    <p>
                      <Image src="/shared/icon-location.svg" alt="" width={16} height={16} />
                      {currentBusiness.location}
                    </p>
                    <p>
                      <Image src="/dashboard/shared/tick-circle.svg" alt="" width={16} height={16} />
                      {currentBusiness.category}
                    </p>
                  </div>
                </div>
                <div className={styles.metrics}>
                  {dashboardMetrics.map((metric) => (
                    <div key={metric.label}>
                      <strong>{metric.value}</strong>
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className={styles.quickSection}>
              <h2>Quick CTA</h2>
              <div className={styles.quickActions}>
                {quickActions.map((action) => (
                  <Link key={action.label} href={action.href}>
                    <Image src={action.icon} alt="" width={32} height={32} />
                    <span>{action.label}</span>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <aside className={styles.dashboardAside}>
            <Link className={styles.completionCard} href="/dashboard/profile/edit">
              <div>
                <h2>Your Business Profile</h2>
                <span>{currentBusiness.profileCompletion}% Complete</span>
              </div>
              <b aria-hidden="true">›</b>
              <div className={styles.progressTrack}>
                <span style={{ width: `${currentBusiness.profileCompletion}%` }} />
              </div>
              <small>Complete your profile to get more visibility</small>
            </Link>

            <section className={styles.activityCard} id="reviews">
              <h2>Recent Activity</h2>
              <div>
                {recentActivity.map((activity) => (
                  <article key={activity.title}>
                    <Image src={activity.icon} alt="" width={24} height={24} />
                    <p>
                      <strong>{activity.title}</strong>
                      <span>{activity.time}</span>
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}

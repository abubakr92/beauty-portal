import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PhoneNumberField from "./_components/PhoneNumberField";
import { communityBenefits, communityValues, membershipPlans } from "./data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Join Our Community | Nothing But Beauty",
  description: "Create your business listing and join a faith-centered marketplace built for Muslim women.",
};

function Field({
  label,
  name,
  placeholder,
  icon,
  type = "text",
  optional = false,
}: {
  label: string;
  name: string;
  placeholder: string;
  icon?: string;
  type?: string;
  optional?: boolean;
}) {
  return (
    <label className={styles.field}>
      <span>{label}{optional && <small> (Optional)</small>}</span>
      <div>{icon && <Image src={icon} alt="" width={22} height={22} />}<input name={name} type={type} placeholder={placeholder} /></div>
    </label>
  );
}

export default function JoinCommunityPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroIntro}>
          <p>Business Owner</p>
          <h1>Join Our<br />Community</h1>
          <span>Create your business listing, connect with Muslim women, and<br className={styles.desktopBreak} /> give your impact in a faith-centered marketplace.</span>
        </div>

        <div className={styles.benefits}>
          {communityBenefits.map((benefit) => (
            <article key={benefit.title}>
              <Image src={benefit.icon} alt="" width={50} height={50} />
              <div><h2>{benefit.title}</h2><p>{benefit.description}</p></div>
            </article>
          ))}
        </div>

        <blockquote><strong>“</strong> And whoever relies<br />upon Allah — then He<br />is sufficient for him.”<cite>Quran 65:3</cite></blockquote>
      </section>

      <form className={styles.communityForm}>
        <p className={styles.formIntro}>Set up your profile and join our community</p>

        <ol className={styles.steps}>
          {[["01", "Account"], ["02", "Business Info"], ["03", "Subscription"], ["03", "Review"]].map(([number, label]) => (
            <li key={label}><strong>{number}</strong><span>{label}</span></li>
          ))}
        </ol>

        <div className={styles.infoGrid}>
          <section className={styles.infoCard}>
            <header><h2>Account Information</h2><p>Let&apos;s start with your account details</p></header>
            <Field label="Full Name" name="fullName" placeholder="Enter your full name" icon="/join-community/icon-user.svg" />
            <Field label="Email Address" name="email" type="email" placeholder="Enter your email address" icon="/join-community/icon-email.svg" />
            <Field label="Password" name="password" type="password" placeholder="Create a strong password" icon="/join-community/icon-lock.svg" />
            <Field label="Confirm Password" name="confirmPassword" type="password" placeholder="Confirm your password" icon="/join-community/icon-lock.svg" />

            <PhoneNumberField />

            <div className={styles.privacyNotice}><Image src="/join-community/icon-secure.svg" alt="" width={24} height={24} /><span>Your information is secure. We always protect your<br />privacy. Your data will never be shared.</span></div>
          </section>

          <section className={styles.infoCard}>
            <header><h2>Business Information</h2><p>Tell us about your business</p></header>
            <Field label="Business Name" name="businessName" placeholder="Enter your business name" icon="/join-community/icon-business.svg" />
            <label className={styles.field}><span>Business Category</span><select name="category" defaultValue=""><option value="" disabled>Select Business Category</option><option>Food & Catering</option><option>Education</option><option>Wellness</option></select></label>
            <label className={styles.field}><span>Subcategory (Optional)</span><select name="subcategory" defaultValue=""><option value="" disabled>Select Subcategory</option><option>Bakery</option></select></label>
            <Field label="City / State, Area" name="city" placeholder="Enter your email address" />
            <label className={styles.field}><span>Business Description</span><textarea name="description" placeholder="Tell us about your business..." /></label>
            <Field label="Website" name="website" type="url" optional placeholder="https://yourwebsite.com" icon="/join-community/icon-globe.svg" />
            <div className={styles.socialField}><a href="#socials">Add more socials</a><Field label="Instagram Handle" name="instagram" optional placeholder="@yourusername" icon="/join-community/icon-instagram.svg" /></div>
          </section>
        </div>

        <fieldset className={styles.planGrid}>
          <legend className={styles.visuallyHidden}>Choose a membership plan</legend>
          {membershipPlans.map((plan, index) => (
            <label className={styles.planCard} data-plan={plan.id} key={plan.id}>
              {index === 1 && <span className={styles.popular}>★ MOST POPULAR</span>}
              <input type="radio" name="membership" value={plan.id} defaultChecked={index === 1} />
              <Image className={styles.planBadge} src={plan.badge} alt="" width={135} height={135} />
              <h2>{plan.name}</h2>
              <p className={styles.price}><strong>{plan.price}</strong>/month</p>
              <p className={styles.planDescription}>{plan.description}</p>
              <ul>{plan.features.map((feature) => <li key={feature}><span>✓</span>{feature}</li>)}</ul>
              <span className={styles.selectPlan}>Select {plan.name.split(" ")[0]}</span>
            </label>
          ))}
        </fieldset>

        <label className={styles.offerRow}>
          <span><Image src="/join-community/icon-gift.svg" alt="" width={16} height={16} /><strong>Founding Business Offer:</strong> Get your first month FREE when you choose an annual plan!</span>
          <span className={styles.toggle}><input type="checkbox" name="annual" /><i /><em>Annual Plan</em></span>
        </label>

        <Link className={styles.continueButton} href="/portal/join-community/submit">Continue →</Link>
        <p className={styles.reviewNote}>🔒 You can review and edit your information before completing.</p>

        <section className={styles.values} aria-label="Community values">
          {communityValues.map(([icon, title, description]) => (
            <article key={title}><Image src={icon} alt="" width={50} height={50} /><div><h2>{title}</h2><p>{description}</p></div></article>
          ))}
        </section>
      </form>
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Submit Your Event | Nothing But Beauty",
  description: "Submit an upcoming workshop or event for promotion across the Nothing But Beauty community.",
};

const promotionFeatures = [
  "Featured on our Events page",
  "Visible to the Nothing But Beauty community",
  "Workshop card with flyer, details & direct link",
  "Shared to our Socials (where applicable)",
  "Support our mission to uplift and empower Muslim women",
] as const;

function InputField({ label, name, placeholder, type = "text" }: { label: string; name: string; placeholder: string; type?: string }) {
  return <label className={styles.field}><span>{label}</span><input name={name} type={type} placeholder={placeholder} /></label>;
}

export default function PromoteWorkshopPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p>Share Your Knowledge · Inspire More Women</p>
        <h1>Promote Your<br />Upcoming Workshop</h1>
        <span>Feature your workshop or event on the Nothing But Beauty Portal for a flat promotion fee of $15</span>
      </section>

      <section className={styles.formShell}>
        <div className={styles.notice}><span aria-hidden="true">i</span><p>Attendees will register and pay through your own external link. We only promote your events on our platform.</p></div>

        <form className={styles.formGrid}>
          <section className={styles.detailsCard}>
            <header><h2>Workshop / Event Details</h2><p>Please provide accurate information so we can properly promote you to the right audience.</p></header>

            <InputField label="Business Category" name="workshopTitle" placeholder="e.g. Natural Hair Care Masterclass" />
            <InputField label="Organizer / Business Name" name="organizer" placeholder="Your business or organisation name" />
            <InputField label="Promoter’s Name" name="promoter" placeholder="Name of the person filling this form" />

            <label className={styles.field}><span>Event Category</span><select name="category" defaultValue=""><option value="" disabled>Select Event Category</option><option>Workshop</option><option>Community Event</option><option>Wellness</option></select></label>
            <label className={styles.field}><span>Brief Description or About the Workshop</span><textarea name="description" placeholder="Tell us what attendees will learn or experience. What makes your workshop special?" /></label>
            <InputField label="Venue Name" name="venue" placeholder="e.g. The Community Centre" />
            <InputField label="City / Town" name="city" placeholder="e.g. Birmingham, UK" />

            <div className={styles.threeColumns}>
              <InputField label="Event Date" name="eventDate" placeholder="Enter Event Date" />
              <InputField label="Start Time" name="startTime" placeholder="Enter Start Time" />
              <InputField label="End Time" name="endTime" placeholder="Enter End Time" />
            </div>

            <InputField label="Booking / Ticket Price" name="price" placeholder="e.g. 25.00" />
            <InputField label="Registration URL" name="registrationUrl" type="url" placeholder="https://your-booking-link.com" />
            <InputField label="Payment URL or Arrival Ticket URL" name="paymentUrl" type="url" placeholder="https://your-payment-link.com" />

            <div className={styles.twoColumns}>
              <InputField label="Contact Email" name="email" type="email" placeholder="hello@yourbusiness.com" />
              <InputField label="WhatsApp Number" name="whatsapp" type="tel" placeholder="+44 7700 000000" />
            </div>

            <label className={styles.logoUpload} htmlFor="businessLogo">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V3m0 0L7 8m5-5 5 5M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" /></svg>
              <strong>Upload Logo</strong><span>JPG, PNG or SVG. 2MB</span>
            </label>
            <input className={styles.fileInput} id="businessLogo" name="businessLogo" type="file" accept="image/png,image/jpeg,image/svg+xml" />
          </section>

          <aside className={styles.promotionCard}>
            <Image className={styles.megaphone} src="/join-community/promotion-megaphone.webp" alt="" width={68} height={68} />
            <h2>Promotion Fee</h2>
            <p className={styles.price}>$15</p>
            <p className={styles.feeNote}>One-time fee per event<br />Non-refundable</p>

            <section className={styles.includes}>
              <h3>Your Promotion Includes:</h3>
              <ul>{promotionFeatures.map((feature) => <li key={feature}><span>✓</span>{feature}</li>)}</ul>
            </section>

            <section className={styles.paymentBox}>
              <h3>Secure Payment</h3>
              <p>Your Payment is encrypted and secure</p>
              <div className={styles.paymentLogos}>
                <Image src="/join-community/payment-visa.png" alt="Visa" width={37} height={19} />
                <Image src="/join-community/payment-mastercard.png" alt="Mastercard" width={37} height={18} />
                <Image src="/join-community/payment-stripe.png" alt="Stripe" width={37} height={18} />
                <Image src="/join-community/payment-paypal.png" alt="PayPal" width={32} height={15} />
              </div>
              <button type="button">Pay $15 &amp; Submit</button>
              <button className={styles.secondaryButton} type="button"><Image src="/join-community/icon-preview-listing.svg" alt="" width={15} height={15} /> Preview Listing</button>
              <button className={styles.secondaryButton} type="button"><Image src="/shared/icon-save-draft.svg" alt="" width={15} height={15} /> Save Draft</button>
            </section>
          </aside>
        </form>
      </section>
    </main>
  );
}

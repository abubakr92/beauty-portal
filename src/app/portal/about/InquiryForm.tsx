"use client";

import { useState, type FormEvent } from "react";
import styles from "./page.module.css";

export default function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [configurationError, setConfigurationError] = useState(false);

  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const inquiryFormUrl = process.env.NEXT_PUBLIC_INQUIRY_FORM_URL;
    if (!inquiryFormUrl) {
      setConfigurationError(true);
      return;
    }

    setConfigurationError(false);
    window.open(inquiryFormUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
    event.currentTarget.reset();
  }

  if (submitted) {
    return <div className={styles.thankYou} role="status"><span>✓</span><h3>Thank you for reaching out.</h3><p>Your inquiry has been received. Our team will be in touch soon, in shaa Allah.</p><button onClick={() => setSubmitted(false)} type="button">Send another inquiry</button></div>;
  }

  return (
    <form className={styles.form} onSubmit={submitInquiry}>
      <label><span>Full Name</span><input name="name" placeholder="Your full name" required /></label>
      <label><span>Email Address</span><input name="email" placeholder="you@example.com" required type="email" /></label>
      <label><span>Inquiry Type</span><select defaultValue="" name="type" required><option disabled value="">Select an option</option><option>General Inquiry</option><option>Partnership</option><option>Business Membership</option><option>Community Support</option><option>Press & Media</option></select></label>
      <label><span>Subject</span><input name="subject" placeholder="How can we help?" required /></label>
      <label className={styles.fullField}><span>Message</span><textarea name="message" placeholder="Tell us a little more about your inquiry..." required rows={6} /></label>
      {configurationError && <p className={styles.formError} role="alert">The inquiry form is not connected yet. Please try again once the contact form has been configured.</p>}
      <button type="submit">Submit Inquiry <span>→</span></button>
    </form>
  );
}

"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import styles from "./LegalModalLink.module.css";

const documents = {
  privacy: {
    title: "Privacy Policy",
    sections: [
      ["Information we collect", "This prototype may collect the account, business, contact, and profile details that you choose to enter. Payment details are not stored in this demo."],
      ["How information is used", "Information is used to demonstrate account setup, business listings, membership features, and community experiences."],
      ["Your choices", "You may request access, correction, or deletion of your information. Final retention and contact procedures will be added before launch."],
    ],
  },
  terms: {
    title: "Terms of Service",
    sections: [
      ["Using the portal", "You agree to provide accurate information, respect the community, and use the portal only for lawful business and community purposes."],
      ["Memberships and listings", "Membership pricing, benefits, renewals, refunds, and listing approval are prototype terms and will be finalized before launch."],
      ["Community standards", "Content that is misleading, harmful, discriminatory, or inconsistent with community guidelines may be reviewed or removed."],
    ],
  },
  businessMembership: {
    title: "Business Membership Terms and Conditions",
    sections: [
      ["Membership and renewal", "Business memberships renew on the billing cycle selected at checkout unless cancelled in accordance with the final membership terms."],
      ["Listings and eligibility", "Listings are subject to review. Promotional opportunities, campaigns, spotlights, and events may have separate eligibility requirements and are not guaranteed unless expressly stated."],
      ["Prototype notice", "This is temporary prototype copy. The client-approved Business Membership Terms and Conditions must replace it before payments are enabled."],
    ],
  },
} as const;

type LegalModalLinkProps = {
  children?: ReactNode;
  document: keyof typeof documents;
};

export default function LegalModalLink({ children, document: documentType }: LegalModalLinkProps) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const content = documents[documentType];

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <>
      <button className={styles.trigger} onClick={() => setOpen(true)} type="button">{children ?? content.title}</button>
      {open && (
        <div className={styles.backdrop} onMouseDown={(event) => { if (event.currentTarget === event.target) setOpen(false); }}>
          <section aria-labelledby={titleId} aria-modal="true" className={styles.dialog} role="dialog">
            <header>
              <div><h2 id={titleId}>{content.title}</h2><p className={styles.draft}>Draft content for prototype review</p></div>
              <button aria-label={`Close ${content.title}`} autoFocus className={styles.close} onClick={() => setOpen(false)} type="button">×</button>
            </header>
            {content.sections.map(([heading, copy]) => <div key={heading}><h3>{heading}</h3><p>{copy}</p></div>)}
          </section>
        </div>
      )}
    </>
  );
}

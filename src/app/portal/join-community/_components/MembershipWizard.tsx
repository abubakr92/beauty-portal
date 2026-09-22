"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import LegalModalLink from "@/components/shared/LegalModalLink";
import { activateMembership, type MembershipTier } from "@/lib/membership";
import { communityValues, membershipPlans } from "../data";
import PhoneNumberField from "./PhoneNumberField";
import styles from "../page.module.css";

type Step = 1 | 2 | 3 | 4 | 5;
type BillingCycle = "monthly" | "annual";
type AccountDetails = { fullName: string; email: string };
type BusinessDetails = {
  name: string;
  category: string;
  subcategory: string;
  location: string;
  serviceModel: string[];
  description: string;
  website: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  booking: string;
  googleBusiness: string;
  extraSocials: string[];
  logo: string;
  photos: string[];
};

const stepLabels = ["Choose Plan", "Your Account", "Business Profile", "Review & Payment"];
const serviceModels = ["Physical location", "Online", "Mobile / travel", "Multiple locations"];

function updateLocation(step: Step) {
  const names = ["plan", "account", "business-profile", "review", "success"];
  window.history.replaceState(null, "", `/portal/join-community?step=${names[step - 1]}`);
  window.scrollTo({ top: 180, behavior: "smooth" });
}

function FormField({ label, name, type = "text", placeholder, required = false, defaultValue }: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return <label className={styles.field}><span>{label}</span><input defaultValue={defaultValue} name={name} placeholder={placeholder} required={required} type={type} /></label>;
}

export default function MembershipWizard() {
  const [step, setStep] = useState<Step>(1);
  const [highestStep, setHighestStep] = useState<Step>(1);
  const [tier, setTier] = useState<MembershipTier>("emerald");
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const [account, setAccount] = useState<AccountDetails>({ fullName: "", email: "" });
  const [business, setBusiness] = useState<BusinessDetails>({
    name: "", category: "", subcategory: "", location: "", serviceModel: ["Physical location"], description: "",
    website: "", instagram: "", facebook: "", tiktok: "", booking: "", googleBusiness: "", extraSocials: [], logo: "", photos: [],
  });
  const [description, setDescription] = useState("");
  const [extraSocials, setExtraSocials] = useState<string[]>([]);
  const [legalAccepted, setLegalAccepted] = useState(false);
  const [error, setError] = useState("");

  const selectedPlan = membershipPlans.find((plan) => plan.id === tier) ?? membershipPlans[0];
  const planPrice = billing === "annual" ? selectedPlan.annualPrice : selectedPlan.monthlyPrice;
  const photoLimit = tier === "gold" ? 15 : 5;
  const wordCount = description.trim() ? description.trim().split(/\s+/).length : 0;

  function goToStep(nextStep: Step) {
    if (nextStep > highestStep) return;
    setStep(nextStep);
    setError("");
    updateLocation(nextStep);
  }

  function continueFromPlan() {
    setHighestStep((current) => Math.max(current, 2) as Step);
    setStep(2);
    updateLocation(2);
  }

  function saveAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirmPassword = String(form.get("confirmPassword") ?? "");
    if (password.length < 8) return setError("Password must be at least 8 characters.");
    if (password !== confirmPassword) return setError("Passwords do not match.");
    setAccount({ fullName: String(form.get("fullName") ?? ""), email: String(form.get("email") ?? "") });
    setError("");
    setHighestStep((current) => Math.max(current, 3) as Step);
    setStep(3);
    updateLocation(3);
  }

  function saveBusiness(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const logo = form.get("logo");
    const photos = form.getAll("photos").filter((item): item is File => item instanceof File && item.size > 0);
    const selectedModels = form.getAll("serviceModel").map(String);
    if (!selectedModels.length) return setError("Select at least one way that you serve customers.");
    setBusiness({
      name: String(form.get("businessName") ?? ""), category: String(form.get("category") ?? ""),
      subcategory: String(form.get("subcategory") ?? ""), location: String(form.get("location") ?? ""),
      serviceModel: selectedModels, description,
      website: String(form.get("website") ?? ""), instagram: String(form.get("instagram") ?? ""),
      facebook: String(form.get("facebook") ?? ""), tiktok: String(form.get("tiktok") ?? ""),
      booking: String(form.get("booking") ?? ""), googleBusiness: String(form.get("googleBusiness") ?? ""),
      extraSocials: extraSocials.map((_, index) => String(form.get(`social-${index}`) ?? "")).filter(Boolean),
      logo: logo instanceof File && logo.size > 0 ? logo.name : business.logo,
      photos: photos.length ? photos.slice(0, photoLimit).map((photo) => photo.name) : business.photos,
    });
    setError("");
    setHighestStep((current) => Math.max(current, 4) as Step);
    setStep(4);
    updateLocation(4);
  }

  function completeMembership() {
    if (!legalAccepted) return setError("Please accept the membership terms, Terms of Service, and Privacy Policy to continue.");
    activateMembership(tier);
    setHighestStep(5);
    setStep(5);
    setError("");
    updateLocation(5);
  }

  return (
    <section className={styles.wizard} aria-label="Business membership application">
      {step < 5 && <ol className={styles.steps}>{stepLabels.map((label, index) => {
        const stepNumber = (index + 1) as Step;
        const available = stepNumber <= highestStep;
        return <li data-active={step === stepNumber} data-complete={stepNumber < highestStep} key={label}><button disabled={!available} onClick={() => goToStep(stepNumber)} type="button"><strong>{String(stepNumber).padStart(2, "0")}</strong><span>{label}</span></button></li>;
      })}</ol>}

      {step === 1 && <div className={styles.stepPanel} id="membership-plans">
        <header className={styles.panelHeader}><p>Step 1 of 4</p><h2>Choose the membership that fits your business</h2><span>Start monthly or save the cost of two months with annual billing. You can review your choice before payment.</span></header>
        <div className={styles.billingToggle} aria-label="Billing cycle"><button aria-pressed={billing === "monthly"} onClick={() => setBilling("monthly")} type="button">Monthly</button><button aria-pressed={billing === "annual"} onClick={() => setBilling("annual")} type="button">Annual <small>Save 2 Months</small></button></div>
        <div className={styles.planGrid}>{membershipPlans.map((plan, index) => {
          const selected = tier === plan.id;
          const price = billing === "annual" ? plan.annualPrice : plan.monthlyPrice;
          return <article className={styles.planCard} data-plan={plan.id} data-selected={selected} key={plan.id}>
            {index === 1 && <span className={styles.popular}>Most Popular</span>}
            <Image className={styles.planBadge} src={plan.badge} alt="" width={124} height={124} />
            <h3>{plan.name}</h3><p className={styles.price}><strong>${price}</strong>/{billing === "annual" ? "year" : "month"}</p>
            {billing === "annual" && <span className={styles.savings}>Save ${plan.annualSavings} per year</span>}
            <p className={styles.planDescription}>{plan.description}</p><ul>{plan.features.map((feature) => <li key={feature}><span>✓</span>{feature}</li>)}</ul>
            <p className={styles.bestFor}>{plan.bestFor}</p><button aria-pressed={selected} onClick={() => setTier(plan.id)} type="button">{selected ? `${plan.name} Selected` : `Choose ${plan.name}`}</button>
          </article>;
        })}</div>
        <aside className={styles.foundingOffer}><Image src="/join-community/icon-gift.svg" alt="" width={26} height={26} /><div><strong>Founding Business Offer</strong><p>Join at launch and receive a founding-member badge, bonus launch visibility, early access to community opportunities, and priority consideration for spotlights and feature campaigns.</p></div></aside>
        <section className={styles.values} aria-label="Community values">{communityValues.map(([icon, title, copy]) => <article key={title}><Image src={icon} alt="" width={46} height={46} /><div><h3>{title}</h3><p>{copy}</p></div></article>)}</section>
        <button className={styles.primaryButton} onClick={continueFromPlan} type="button">Continue with {selectedPlan.name} <span>→</span></button>
      </div>}

      {step === 2 && <form className={styles.stepPanel} onSubmit={saveAccount}>
        <header className={styles.panelHeader}><p>Step 2 of 4</p><h2>Create Your Business Account</h2><span>This account gives you access to your business dashboard, listing, messages, membership, and future updates.</span></header>
        <div className={styles.formGrid}><FormField defaultValue={account.fullName} label="Full Name" name="fullName" placeholder="Enter your full name" required /><FormField defaultValue={account.email} label="Email Address" name="email" placeholder="you@example.com" required type="email" /><FormField label="Password" name="password" placeholder="At least 8 characters" required type="password" /><FormField label="Confirm Password" name="confirmPassword" placeholder="Re-enter your password" required type="password" /><PhoneNumberField /></div>
        {error && <p className={styles.error} role="alert">{error}</p>}<button className={styles.primaryButton} type="submit">Continue to Business Profile <span>→</span></button><p className={styles.signInNote}>Already have an account? <Link href="/auth/login">Sign in</Link></p>
      </form>}

      {step === 3 && <form className={styles.stepPanel} onSubmit={saveBusiness}>
        <header className={styles.panelHeader}><p>Step 3 of 4</p><h2>Tell Us About Your Business</h2><span>These details shape your directory listing and help customers quickly understand what you offer and how to reach you.</span></header>
        <div className={styles.formGrid}><FormField defaultValue={business.name} label="Business Name" name="businessName" placeholder="Enter your business name" required /><label className={styles.field}><span>Business Category</span><select defaultValue={business.category} name="category" required><option disabled value="">Select a business category</option><option>Beauty & Skincare</option><option>Education</option><option>Food & Catering</option><option>Home & Decor</option><option>Modest Fashion</option><option>Professional Services</option><option>Wellness</option></select></label><label className={styles.field}><span>Subcategory (Optional)</span><select defaultValue={business.subcategory} name="subcategory"><option value="">Select a subcategory</option><option>Consulting</option><option>Coaching</option><option>Products</option><option>Professional Service</option><option>Retail</option><option>Workshops & Classes</option></select></label><FormField defaultValue={business.location} label="City / State or Service Area" name="location" placeholder="e.g. Mississauga, ON or Online" required /></div>
        <fieldset className={styles.serviceModel}><legend>How do you serve customers? Select all that apply.</legend>{serviceModels.map((model) => <label key={model}><input defaultChecked={business.serviceModel.includes(model)} name="serviceModel" type="checkbox" value={model} /><span>{model}</span></label>)}</fieldset>
        <label className={styles.field}><span>About Your Business</span><textarea defaultValue={business.description} name="description" onChange={(event) => setDescription(event.target.value)} placeholder="Tell customers what you offer, who you serve, and what makes your business special." required /><small className={wordCount >= 50 && wordCount <= 150 ? styles.goodCount : undefined}>{wordCount} words · 50–150 words recommended</small></label>
        <h3 className={styles.sectionTitle}>Where can customers find you?</h3><p className={styles.sectionCopy}>Add the links customers can use to learn more, follow your work, book, or contact your business.</p><div className={styles.formGrid}><FormField defaultValue={business.website} label="Website (Optional)" name="website" placeholder="https://yourbusiness.com" type="url" /><FormField defaultValue={business.instagram} label="Instagram (Optional)" name="instagram" placeholder="https://instagram.com/yourbusiness" type="url" /><FormField defaultValue={business.facebook} label="Facebook (Optional)" name="facebook" placeholder="https://facebook.com/yourbusiness" type="url" /><FormField defaultValue={business.tiktok} label="TikTok (Optional)" name="tiktok" placeholder="https://tiktok.com/@yourbusiness" type="url" /><FormField defaultValue={business.booking} label="Booking Link (Optional)" name="booking" placeholder="https://your-booking-link.com" type="url" /><FormField defaultValue={business.googleBusiness} label="Google Business / Review Link (Optional)" name="googleBusiness" placeholder="Paste your Google profile or review link" type="url" />{extraSocials.map((value, index) => <FormField defaultValue={value} key={index} label={`Additional Social Profile ${index + 1}`} name={`social-${index}`} placeholder="Paste social profile URL" type="url" />)}</div>
        <button className={styles.addSocial} disabled={extraSocials.length >= 3} onClick={() => setExtraSocials((current) => [...current, ""])} type="button">+ Add another social profile</button>
        <div className={styles.uploadGrid}><label><strong>Business Logo</strong><span>{business.logo || "Upload one clear, square logo in JPG, PNG, or WebP format."}</span><small>One image · recommended 800 × 800 px</small><input accept="image/png,image/jpeg,image/webp" name="logo" type="file" /></label><label><strong>Business Photos</strong><span>{business.photos.length ? business.photos.join(", ") : `Show your products, services, team, or space. Upload up to ${photoLimit} images.`}</span><small>JPG, PNG, or WebP</small><input accept="image/png,image/jpeg,image/webp" multiple name="photos" type="file" /></label></div>
        {error && <p className={styles.error} role="alert">{error}</p>}<button className={styles.primaryButton} type="submit">Review Your Membership <span>→</span></button>
      </form>}

      {step === 4 && <div className={styles.stepPanel}>
        <header className={styles.panelHeader}><p>Step 4 of 4</p><h2>Review Your Membership</h2><span>Confirm your selected plan and business details before continuing to secure payment.</span></header>
        <div className={styles.reviewGrid}><section><header><h3>Membership</h3><button onClick={() => goToStep(1)} type="button">Change</button></header><p><strong>{selectedPlan.name}</strong></p><p>{billing === "annual" ? "Annual billing" : "Monthly billing"}</p></section><section><header><h3>Your Account</h3><button onClick={() => goToStep(2)} type="button">Edit</button></header><p><strong>{account.fullName}</strong></p><p>{account.email}</p></section><section><header><h3>Business Profile</h3><button onClick={() => goToStep(3)} type="button">Edit</button></header><p><strong>{business.name}</strong></p><p>{business.category}{business.subcategory ? ` · ${business.subcategory}` : ""}</p><p>{business.location} · {business.serviceModel.join(", ")}</p></section></div>
        <aside className={styles.orderSummary}><h3>Order Summary</h3><div><span>{selectedPlan.name}</span><strong>${planPrice.toFixed(2)}</strong></div><div><span>Billing frequency</span><strong>{billing === "annual" ? "Per year" : "Per month"}</strong></div><div><span>Tax</span><strong>Calculated at secure checkout</strong></div><div className={styles.orderTotal}><span>Due before tax</span><strong>${planPrice.toFixed(2)} {billing === "annual" ? "/ year" : "/ month"}</strong></div><p className={styles.renewalNote}>Your membership renews automatically every {billing === "annual" ? "year" : "month"} until cancelled. You can manage your membership from the Business Dashboard.</p></aside>
        <label className={styles.legalCheck}><input checked={legalAccepted} onChange={(event) => setLegalAccepted(event.target.checked)} type="checkbox" /><span>I agree to the <LegalModalLink document="businessMembership">Business Membership Terms</LegalModalLink>, <LegalModalLink document="terms">Terms of Service</LegalModalLink>, <LegalModalLink document="privacy">Privacy Policy</LegalModalLink>, and recurring membership billing shown above.</span></label>
        {error && <p className={styles.error} role="alert">{error}</p>}<button className={styles.primaryButton} onClick={completeMembership} type="button">Continue to Secure Payment <span>→</span></button><p className={styles.secureNote}>🔒 Prototype payment confirmation — no payment details are collected.</p>
      </div>}

      {step === 5 && <div className={styles.success}><span aria-hidden="true">✓</span><p>Welcome to Nothing But Beauty Portal</p><h2>Business Community</h2><p>Your {selectedPlan.name} membership is active. Complete these details to make your listing ready for customers:</p><ul><li>Add or confirm your logo and business photos</li><li>Refine your business description</li><li>Add your booking, contact, and social links</li><li>Preview your public directory listing</li></ul><div className={styles.successActions}><Link href="/dashboard/profile/edit">Complete My Business Profile <span>→</span></Link><Link href="/dashboard">Go to Business Dashboard</Link></div></div>}
    </section>
  );
}

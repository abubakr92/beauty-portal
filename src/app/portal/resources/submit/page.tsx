import type { Metadata } from "next";
import Image from "next/image";
import ResourcesHero from "../_components/ResourcesHero";
import ArchiveSubmissionForm from "./ArchiveSubmissionForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Submit Your Archive | Nothing But Beauty",
  description: "Share lectures, workshops, PDFs, slides, and audio resources with the community.",
};

const resourceTypes = [
  ["lecture", "Lecture", "/resources/type-lecture.svg"],
  ["workshop", "Workshop", "/resources/type-workshop.svg"],
  ["pdf", "PDF", "/resources/type-pdf.svg"],
  ["slides", "Slides", "/resources/type-slides.svg"],
  ["audio", "Audio", "/resources/type-audio.svg"],
] as const;

function UploadField({ id, title, recommendation }: { id: string; title: string; recommendation: string }) {
  return (
    <section className={styles.uploadCard}>
      <h2>{title}</h2>
      <p>{recommendation}</p>
      <label className={styles.uploadArea} htmlFor={id}>
        <Image src="/resources/gallery.svg" alt="" width={26} height={26} />
        <span><strong>Upload Image</strong><small>PNG, JPG up to 5MB</small></span>
      </label>
      <input className={styles.fileInput} id={id} name={id} type="file" accept="image/png,image/jpeg" />
    </section>
  );
}

export default function SubmitArchivePage() {
  return (
    <main className={styles.page}>
      <ResourcesHero
        compact
        eyebrow="Share Your Knowledge · Inspire More Women"
        title={<>Submit Your<br />Archive</>}
        description="Share lectures, workshops, PDFs and audio with the community."
      />

      <section className={styles.formShell}>
        <div className={styles.notice}>
          <Image src="/shared/info.svg" alt="" width={24} height={24} />
          <div><strong>Files remain on your own Google Drive or Dropbox.</strong><span>Submit secure links so your archive can be listed in one place.</span></div>
        </div>

        <ArchiveSubmissionForm className={styles.formGrid}>
          <div className={styles.mainForm}>
            <div className={styles.twoColumns}>
              <label>Contributor Name<input name="contributorName" placeholder="Your full name" /></label>
              <label>Scholar / Speaker Name<input name="scholarName" placeholder="Name of the scholar or speaker" /></label>
            </div>

            <label>Resource Title<input name="title" placeholder="Enter a clear and descriptive title" /></label>

            <fieldset className={styles.resourceTypes}>
              <legend>What best describes your business?</legend>
              <div>{resourceTypes.map(([value, label, icon], index) => (
                <label key={value}>
                  <input type="radio" name="resourceType" value={value} defaultChecked={index === 1} />
                  <span><Image src={icon} alt="" width={13} height={13} />{label}</span>
                </label>
              ))}</div>
            </fieldset>

            <div className={styles.twoColumns}>
              <label>Topic / Category<select name="topic" defaultValue=""><option value="" disabled>Select or search topic</option><option>Quran</option><option>Fiqh</option><option>Wellbeing</option></select></label>
              <label>Series / Event Name (optional)<select name="series" defaultValue=""><option value="" disabled>E.g., Ramadan Series 2024</option><option>Ramadan Series 2024</option></select></label>
            </div>

            <label>Description<textarea name="description" placeholder="Briefly describe the content of this resource" /></label>

            <label className={styles.dateField}>Date<span><input name="date" type="date" /><Image src="/resources/calendar.svg" alt="" width={20} height={20} /></span></label>

            <fieldset className={styles.storageTypes}>
              <legend>External Storage Type</legend>
              <div>
                <label><input type="radio" name="storage" value="google-drive" defaultChecked /><span><Image src="/resources/google-drive.png" alt="" width={15} height={15} />Google Drive</span></label>
                <label><input type="radio" name="storage" value="dropbox" /><span><Image src="/resources/dropbox.svg" alt="" width={13} height={13} />Dropbox</span></label>
                <label><input type="radio" name="storage" value="link" /><span><Image src="/resources/link.svg" alt="" width={13} height={13} />Other Link</span></label>
              </div>
            </fieldset>

            <label>Paste Resource URL<input name="resourceUrl" type="url" placeholder="Enter link" /><small>Make sure the link is public or accessible–</small></label>
            <label>Additional Resource Links (Optional)<input name="additionalUrl" type="url" placeholder="Enter link" /><small>Add another link</small></label>
            <label>Tags / Keywords<input name="tags" placeholder="Add tags and press enter" /><small>Helps your content be found</small></label>

            <div className={styles.twoColumns}>
              <label>Contact Email<input name="email" type="email" placeholder="hello@yourbusiness.com" /></label>
              <label>WhatsApp Number<input name="whatsapp" type="tel" placeholder="+44 7700 000000" /></label>
            </div>
          </div>

          <aside className={styles.sideForm}>
            <UploadField id="coverImage" title="Cover Image / Flyer" recommendation="Recommended size 1200×750px" />
            <UploadField id="speakerPhoto" title="Speaker Photo (Optional)" recommendation="Recommended size 400×400px" />

            <section className={styles.submitCard}>
              <label className={styles.consent}>
                <input type="checkbox" name="consent" />
                <span>I confirm that I have the right to share this content and grant <strong>Nothing But Beauty Portal</strong> permission to list and display this in the archive with the provided link.</span>
              </label>
              <button type="submit">Submit Archive</button>
              <button className={styles.draftButton} data-save-archive-draft type="button"><Image src="/shared/icon-save-draft.svg" alt="" width={15} height={15} />Save Draft</button>
            </section>
          </aside>
        </ArchiveSubmissionForm>
      </section>
    </main>
  );
}

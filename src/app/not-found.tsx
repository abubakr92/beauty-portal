import Image from "next/image";
import Link from "next/link";
import MainHeader from "@/components/shared/MainHeader";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <>
      <MainHeader />
      <main className={styles.notFoundPage}>
        <section className={styles.notFoundCard}>
          <Image src="/dashboard/shared/emerald-membership.png" alt="" width={76} height={76} priority />
          <p className={styles.errorCode}>404</p>
          <h1>This page wandered off the path.</h1>
          <p className={styles.description}>
            The page you are looking for does not exist or may have moved. Let&apos;s take you back somewhere familiar.
          </p>
          <div className={styles.actions}>
            <Link href="/portal/home">Return Home</Link>
            <Link href="/dashboard">Business Dashboard</Link>
          </div>
        </section>
      </main>
    </>
  );
}

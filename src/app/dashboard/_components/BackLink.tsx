import Link from "next/link";
import styles from "../dashboard.module.css";

export default function BackLink({ href = "/dashboard" }: { href?: string }) {
  return (
    <Link className={styles.backLink} href={href}>
      <span aria-hidden="true">←</span> Back
    </Link>
  );
}

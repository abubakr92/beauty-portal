import Image from "next/image";
import styles from "../auth.module.css";

export default function SocialButtons() {
  return (
    <>
      <div className={styles.divider}>OR</div>
      <div className={styles.socialButtons}>
        <button type="button">
          <Image src="/auth/google.png" alt="" width={25} height={25} />
          Sign in with Google
        </button>
        <button type="button">
          <Image src="/auth/apple.png" alt="" width={20} height={25} />
          Sign in with Apple
        </button>
      </div>
    </>
  );
}

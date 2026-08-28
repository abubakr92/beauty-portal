"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../auth.module.css";

export default function SocialButtons() {
  const router = useRouter();
  const [provider, setProvider] = useState<"Google" | "Apple" | null>(null);

  function continueWith(nextProvider: "Google" | "Apple") {
    setProvider(nextProvider);
    window.setTimeout(() => router.push("/portal/home"), 350);
  }

  return (
    <>
      <div className={styles.divider}>OR</div>
      <div className={styles.socialButtons}>
        <button disabled={provider !== null} onClick={() => continueWith("Google")} type="button">
          <Image src="/auth/google.png" alt="" width={25} height={25} />
          {provider === "Google" ? "Connecting..." : "Sign in with Google"}
        </button>
        <button disabled={provider !== null} onClick={() => continueWith("Apple")} type="button">
          <Image src="/auth/apple.png" alt="" width={20} height={25} />
          {provider === "Apple" ? "Connecting..." : "Sign in with Apple"}
        </button>
      </div>
    </>
  );
}

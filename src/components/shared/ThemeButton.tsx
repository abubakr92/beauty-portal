"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./MainHeader.module.css";

type Theme = "light" | "dark";

export default function ThemeButton() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("nbb-theme");
    const initialTheme: Theme = storedTheme === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = initialTheme;
    const frame = window.requestAnimationFrame(() => setTheme(initialTheme));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("nbb-theme", nextTheme);
  }

  return (
    <button
      className={styles.themeButton}
      type="button"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      aria-pressed={theme === "dark"}
      onClick={toggleTheme}
      title={`${theme === "light" ? "Dark" : "Light"} theme`}
    >
      <Image src="/shared/theme-toggle.svg" alt="" width={40} height={40} />
    </button>
  );
}

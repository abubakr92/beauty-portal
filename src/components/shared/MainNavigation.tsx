"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "Home", href: "/portal/home" },
  { label: "Business Dashboard", href: "/dashboard" },
  { label: "Directory", href: "/portal/directory" },
  { label: "Sanctuary", href: "/portal/sanctuary" },
  { label: "Zehra AI", href: "/portal/zehra-ai" },
  { label: "Events", href: "/portal/events" },
  { label: "Resources", href: "/portal/resources" },
  { label: "About Us", href: "/portal/home#about" },
];

type MainNavigationProps = {
  ariaLabel: string;
  className?: string;
  showAccountLinks?: boolean;
};

export default function MainNavigation({ ariaLabel, className, showAccountLinks = false }: MainNavigationProps) {
  const pathname = usePathname();

  function isCurrentPage(href: string) {
    if (href.includes("#")) {
      return false;
    }

    if (href === "/portal/home") {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <nav className={className} aria-label={ariaLabel}>
      {navigation.map((item) => (
        <Link key={item.label} href={item.href} aria-current={isCurrentPage(item.href) ? "page" : undefined}>
          {item.label}
        </Link>
      ))}
      {showAccountLinks && (
        <Link href="/auth/login">Sign In</Link>
      )}
    </nav>
  );
}

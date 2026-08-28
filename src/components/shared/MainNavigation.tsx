"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { hasActiveMembership } from "@/lib/membership";
import LogoutLink from "./LogoutLink";

type NavigationItem = {
  label: string;
  href: string;
  membershipHref?: string;
};

const navigation: NavigationItem[] = [
  { label: "Home", href: "/portal/home" },
  { label: "Directory", href: "/portal/directory" },
  { label: "Sanctuary", href: "/portal/sanctuary" },
  { label: "Zehra AI", href: "/portal/zehra-ai" },
  { label: "Events", href: "/portal/events" },
  { label: "Resources", href: "/portal/resources" },
  { label: "Business Dashboard", href: "/dashboard", membershipHref: "/portal/join-community" },
  { label: "About Us", href: "/portal/home#about" },
];

type MainNavigationProps = {
  ariaLabel: string;
  className?: string;
  showAccountLinks?: boolean;
};

export default function MainNavigation({ ariaLabel, className, showAccountLinks = false }: MainNavigationProps) {
  const pathname = usePathname();
  const [paidMember, setPaidMember] = useState(false);

  useEffect(() => {
    const syncMembership = () => setPaidMember(hasActiveMembership());
    const frame = window.requestAnimationFrame(syncMembership);
    window.addEventListener("storage", syncMembership);
    window.addEventListener("nbb:membership-change", syncMembership);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("storage", syncMembership);
      window.removeEventListener("nbb:membership-change", syncMembership);
    };
  }, []);

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
      {navigation.map((item) => {
        const href = item.membershipHref && !paidMember ? item.membershipHref : item.href;
        return <Link key={item.label} href={href} aria-current={isCurrentPage(item.href) ? "page" : undefined}>{item.label}</Link>;
      })}
      {showAccountLinks && (
        <LogoutLink />
      )}
    </nav>
  );
}

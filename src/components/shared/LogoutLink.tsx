"use client";

import { useRouter } from "next/navigation";
import { clearMockSession } from "@/lib/membership";

type LogoutLinkProps = {
  className?: string;
};

export default function LogoutLink({ className }: LogoutLinkProps) {
  const router = useRouter();

  function logOut() {
    clearMockSession();
    router.push("/auth/login");
  }

  return <button className={className} onClick={logOut} type="button">Log Out</button>;
}

"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";

export default function CommunityForm({ children, className }: { children: ReactNode; className: string }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  function continueToDashboard(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => router.push("/dashboard"), 350);
  }

  return <form className={className} data-submitting={submitting} onSubmit={continueToDashboard}>{children}</form>;
}

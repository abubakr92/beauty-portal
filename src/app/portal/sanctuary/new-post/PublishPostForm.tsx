"use client";

import { useRouter } from "next/navigation";

type PublishPostFormProps = {
  children: React.ReactNode;
  className: string;
};

export default function PublishPostForm({ children, className }: PublishPostFormProps) {
  const router = useRouter();

  return (
    <form
      className={className}
      aria-label="Create a Sanctuary post"
      onSubmit={(event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const id = `discussion-${Date.now()}`;
        sessionStorage.setItem("sanctuary:new-discussion", JSON.stringify({
          id,
          title: String(form.get("title") ?? ""),
          body: String(form.get("body") ?? ""),
          category: String(form.get("category") ?? ""),
          identity: String(form.get("identity") ?? "profile"),
          anonymousHandle: String(form.get("anonymousHandle") ?? ""),
          tags: form.getAll("tags").map(String),
        }));
        router.push(`/portal/sanctuary/${id}?created=1`);
      }}
    >
      {children}
    </form>
  );
}

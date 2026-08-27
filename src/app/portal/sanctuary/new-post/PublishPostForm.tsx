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
        router.push("/portal/sanctuary");
      }}
    >
      {children}
    </form>
  );
}

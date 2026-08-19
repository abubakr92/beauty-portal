"use client";

import { useRouter } from "next/navigation";

type AuthFormProps = {
  children: React.ReactNode;
  className?: string;
  nextHref: string;
};

export default function AuthForm({ children, className, nextHref }: AuthFormProps) {
  const router = useRouter();

  return (
    <form
      className={className}
      onSubmit={(event) => {
        event.preventDefault();
        router.push(nextHref);
      }}
    >
      {children}
    </form>
  );
}

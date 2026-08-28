import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sanctuary | Nothing But Beauty",
  description: "A private, faith-focused space for Muslim women to connect, share, learn, and grow.",
};

export default function SanctuaryLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

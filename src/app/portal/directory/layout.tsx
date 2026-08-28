import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Directory | Nothing But Beauty",
  description: "Discover women-owned businesses, services, and resources aligned with your values.",
};

export default function DirectoryLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

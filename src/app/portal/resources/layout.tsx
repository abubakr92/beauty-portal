import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resource Library | Nothing But Beauty",
  description: "Explore lectures, workshops, PDFs, slides, and scholar collections shared by Muslim women.",
};

export default function ResourcesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

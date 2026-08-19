import type { Metadata } from "next";
import MainHeader from "@/components/shared/MainHeader";

export const metadata: Metadata = {
  title: "Business Dashboard | Nothing But Beauty",
};

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <MainHeader />
      {children}
    </>
  );
}

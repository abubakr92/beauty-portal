import MainHeader from "@/components/shared/MainHeader";

export default function PortalLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <MainHeader />
      {children}
    </>
  );
}

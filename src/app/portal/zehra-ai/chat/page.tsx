import type { Metadata } from "next";
import ZehraChat from "./_components/ZehraChat";

export const metadata: Metadata = {
  title: "Chat with Zehra AI | Nothing But Beauty",
  description: "Talk with Zehra, your faith-rooted companion.",
};

export default function ZehraChatPage() {
  return <ZehraChat />;
}

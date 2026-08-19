import { redirect } from "next/navigation";

export default function SignupPage() {
  redirect("/auth/signup/step-1");
}

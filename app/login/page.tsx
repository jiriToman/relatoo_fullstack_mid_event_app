import type { Metadata } from "next";

import { LoginForm } from "@/components/auth/login-form";
import loginStrings from "@/lib/strings/pages/login.json";

export const metadata: Metadata = {
  title: loginStrings.metadata.title,
};

export default function LoginPage() {
  return <LoginForm />;
}

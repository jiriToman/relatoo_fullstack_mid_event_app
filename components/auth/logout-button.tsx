"use client";

import { useRouter } from "next/navigation";

import { clearAuthToken } from "@/lib/auth/token";

export function LogoutButton() {
  const router = useRouter();

  function handleLogout() {
    clearAuthToken();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-[5px] border border-relatoo-gray-light px-4 py-2 text-sm font-medium text-relatoo-dark transition hover:border-relatoo-green hover:text-relatoo-green-dark"
    >
      Odhlásit se
    </button>
  );
}

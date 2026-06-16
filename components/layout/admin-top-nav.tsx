"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LogoutButton } from "@/components/auth/logout-button";
import commonStrings from "@/lib/strings/common.json";

type AdminTopNavProps = {
  pageTitle: string;
};

const NAV_ITEMS = [
  { href: "/", label: commonStrings.dashboardOverview },
  { href: "/events", label: commonStrings.eventsList },
  { href: "/events/new", label: commonStrings.createEvent },
] as const;

function navLinkClassName(isActive: boolean): string {
  const base =
    "rounded-[5px] border px-4 py-2 text-sm font-medium transition";

  return isActive
    ? `${base} border-relatoo-green bg-relatoo-green-pale text-relatoo-green-dark`
    : `${base} border-relatoo-gray-light text-relatoo-dark hover:border-relatoo-green hover:text-relatoo-green-dark`;
}

function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  if (href === "/events") {
    return pathname === "/events";
  }

  return pathname === href;
}

export function AdminTopNav({ pageTitle }: AdminTopNavProps) {
  const pathname = usePathname();

  return (
    <header className="border-b border-relatoo-gray-light bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-relatoo-green-dark">
            {commonStrings.appName}
          </p>
          <h1 className="text-lg font-semibold text-relatoo-dark">{pageTitle}</h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <nav className="flex flex-wrap items-center gap-2" aria-label="Admin navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = isNavActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={navLinkClassName(isActive)}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}

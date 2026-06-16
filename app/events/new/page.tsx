import type { Metadata } from "next";
import Link from "next/link";

import { AuthGate } from "@/components/auth/auth-gate";
import { LogoutButton } from "@/components/auth/logout-button";
import { CreateEventForm } from "@/components/events/create-event-form";
import { AdminPageHeader } from "@/components/layout/admin-page-header";
import commonStrings from "@/lib/strings/common.json";
import createEventStrings from "@/lib/strings/pages/create-event.json";

export const metadata: Metadata = {
  title: createEventStrings.metadata.title,
};

const linkClassName =
  "rounded-[5px] border border-relatoo-gray-light px-4 py-2 text-sm font-medium text-relatoo-dark transition hover:border-relatoo-green hover:text-relatoo-green-dark";

export default function CreateEventPage() {
  return (
    <AuthGate>
      <div className="flex flex-1 flex-col bg-relatoo-gray-light">
        <AdminPageHeader
          sectionLabel={createEventStrings.page.sectionLabel}
          title={createEventStrings.page.title}
          actions={
            <div className="flex flex-wrap items-center gap-2">
              <Link href="/" className={linkClassName}>
                {commonStrings.dashboardOverview}
              </Link>
              <Link href="/events" className={linkClassName}>
                {commonStrings.eventsList}
              </Link>
              <LogoutButton />
            </div>
          }
        />

        <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-10">
          <div className="rounded-xl border border-relatoo-gray-light bg-white p-8 shadow-sm">
            <p className="text-sm text-relatoo-gray">{createEventStrings.page.description}</p>
            <div className="mt-6">
              <CreateEventForm />
            </div>
          </div>
        </main>
      </div>
    </AuthGate>
  );
}

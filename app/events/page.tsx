import type { Metadata } from "next";

import { AuthGate } from "@/components/auth/auth-gate";
import { EventsListPage } from "@/components/events/events-list-page";
import eventsStrings from "@/lib/strings/pages/events.json";

export const metadata: Metadata = {
  title: eventsStrings.metadata.title,
};

export default function EventsPage() {
  return (
    <AuthGate>
      <EventsListPage />
    </AuthGate>
  );
}

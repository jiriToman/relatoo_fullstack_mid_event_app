import type { EventStatus } from "@/lib/api";
import eventsStrings from "@/lib/strings/pages/events.json";

export function formatEventDate(value: string): string {
  return new Date(value).toLocaleString("cs-CZ");
}

export function getEventStatusLabel(status: EventStatus): string {
  return eventsStrings.status[status];
}

export const EVENT_STATUSES: EventStatus[] = ["draft", "published", "cancelled"];

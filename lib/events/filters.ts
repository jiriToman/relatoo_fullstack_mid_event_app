import type { EventStatus, ListEventsFilters } from "@/lib/api";

export type EventsFilterForm = {
  status: EventStatus | "";
  from: string;
  to: string;
  title: string;
};

export const EMPTY_EVENTS_FILTER_FORM: EventsFilterForm = {
  status: "",
  from: "",
  to: "",
  title: "",
};

export function isDateRangeInvalid(form: EventsFilterForm): boolean {
  if (!form.from || !form.to) {
    return false;
  }

  return form.to < form.from;
}

function toStartOfDayIso(date: string): string {
  return new Date(`${date}T00:00:00`).toISOString();
}

function toEndOfDayIso(date: string): string {
  return new Date(`${date}T23:59:59.999`).toISOString();
}

export function toListEventsFilters(form: EventsFilterForm): ListEventsFilters | null {
  if (isDateRangeInvalid(form)) {
    return null;
  }

  const filters: ListEventsFilters = {};

  if (form.status) {
    filters.status = form.status;
  }
  if (form.from) {
    filters.from = toStartOfDayIso(form.from);
  }
  if (form.to) {
    filters.to = toEndOfDayIso(form.to);
  }
  if (form.title.trim()) {
    filters.title = form.title.trim();
  }

  return filters;
}

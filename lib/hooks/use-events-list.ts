"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { ApiError, api, type Event, type ListEventsFilters } from "@/lib/api";
import { getAuthToken } from "@/lib/auth/token";
import {
  EMPTY_EVENTS_FILTER_FORM,
  type EventsFilterForm,
  toListEventsFilters,
} from "@/lib/events/filters";
import eventsStrings from "@/lib/strings/pages/events.json";

export const EVENT_PAGE_SIZES = [5, 10, 20] as const;

type EventsState =
  | { type: "loading" }
  | { type: "error"; message: string }
  | { type: "ready"; events: Event[] };

export function useEventsList() {
  const [eventsState, setEventsState] = useState<EventsState>({ type: "loading" });
  const [pageSize, setPageSize] = useState<(typeof EVENT_PAGE_SIZES)[number]>(10);
  const [page, setPage] = useState(1);
  const [filterForm, setFilterForm] = useState<EventsFilterForm>(
    EMPTY_EVENTS_FILTER_FORM,
  );
  const [appliedFilters, setAppliedFilters] = useState<ListEventsFilters>({});

  const loadEvents = useCallback((filters: ListEventsFilters) => {
    const token = getAuthToken();
    if (!token) {
      setEventsState({ type: "error", message: eventsStrings.errors.loadFailed });
      return;
    }

    setEventsState({ type: "loading" });

    void api
      .listEvents(token, filters)
      .then((events) => {
        setEventsState({ type: "ready", events });
      })
      .catch((error: unknown) => {
        const message =
          error instanceof ApiError || error instanceof Error
            ? error.message
            : eventsStrings.errors.loadFailed;
        setEventsState({ type: "error", message });
      });
  }, []);

  useEffect(() => {
    loadEvents(appliedFilters);
  }, [appliedFilters, loadEvents]);

  const events = eventsState.type === "ready" ? eventsState.events : [];
  const totalPages = Math.max(1, Math.ceil(events.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const visibleEvents = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return events.slice(start, start + pageSize);
  }, [events, pageSize, safePage]);

  function changePageSize(size: number) {
    setPageSize(size as (typeof EVENT_PAGE_SIZES)[number]);
    setPage(1);
  }

  function applyFilters() {
    const filters = toListEventsFilters(filterForm);
    if (!filters) {
      return;
    }

    setAppliedFilters(filters);
    setPage(1);
  }

  function clearFilters() {
    setFilterForm(EMPTY_EVENTS_FILTER_FORM);
    setAppliedFilters({});
    setPage(1);
  }

  return {
    eventsState,
    events,
    visibleEvents,
    pageSize,
    page: safePage,
    totalPages,
    filterForm,
    setFilterForm,
    applyFilters,
    clearFilters,
    setPage,
    changePageSize,
  };
}

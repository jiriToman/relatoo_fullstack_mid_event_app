"use client";

import Link from "next/link";
import { useState } from "react";

import { AdminPageHeader } from "@/components/layout/admin-page-header";
import { EventDetailModal } from "@/components/events/event-detail-modal";
import { Alert } from "@/components/ui/alert";
import { PageSizeSelect } from "@/components/ui/page-size-select";
import { EventsFilters } from "@/components/events/events-filters";
import { EventsPagination } from "@/components/events/events-pagination";
import { EventsTable } from "@/components/events/events-table";
import { EVENT_PAGE_SIZES, useEventsList } from "@/lib/hooks/use-events-list";
import commonStrings from "@/lib/strings/common.json";
import eventsStrings from "@/lib/strings/pages/events.json";

export function EventsListPage() {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const {
    eventsState,
    events,
    visibleEvents,
    pageSize,
    page,
    totalPages,
    filterForm,
    setFilterForm,
    applyFilters,
    clearFilters,
    reloadEvents,
    setPage,
    changePageSize,
  } = useEventsList();

  return (
    <div className="flex flex-1 flex-col bg-relatoo-gray-light">
      <AdminPageHeader
        sectionLabel={eventsStrings.page.sectionLabel}
        title={eventsStrings.page.title}
        actions={
          <Link
            href="/"
            className="rounded-[5px] border border-relatoo-gray-light px-4 py-2 text-sm font-medium text-relatoo-dark transition hover:border-relatoo-green hover:text-relatoo-green-dark"
          >
            {eventsStrings.page.backToDashboard}
          </Link>
        }
      />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        <div className="rounded-xl border border-relatoo-gray-light bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-relatoo-dark">
                {commonStrings.eventsList}
              </h2>
              <p className="mt-2 text-sm text-relatoo-gray">
                {eventsStrings.page.description}
              </p>
            </div>

            <PageSizeSelect
              label={eventsStrings.page.itemsPerPageLabel}
              value={pageSize}
              options={EVENT_PAGE_SIZES}
              onChange={changePageSize}
            />
          </div>

          <EventsFilters
            value={filterForm}
            onChange={setFilterForm}
            onApply={applyFilters}
            onClear={clearFilters}
          />

          {eventsState.type === "loading" && (
            <p className="mt-6 text-sm text-relatoo-gray">{commonStrings.loading}</p>
          )}

          {eventsState.type === "error" && <Alert message={eventsState.message} />}

          {eventsState.type === "ready" && (
            <>
              {events.length === 0 ? (
                <p className="mt-6 text-sm text-relatoo-gray">{eventsStrings.page.empty}</p>
              ) : (
                <>
                  <EventsTable
                    events={visibleEvents}
                    onDetailClick={setSelectedEventId}
                  />
                  <EventsPagination
                    page={page}
                    totalPages={totalPages}
                    onPrevious={() => setPage((current) => Math.max(1, current - 1))}
                    onNext={() => setPage((current) => Math.min(totalPages, current + 1))}
                  />
                </>
              )}
            </>
          )}
        </div>
      </main>

      <EventDetailModal
        eventId={selectedEventId}
        onClose={() => setSelectedEventId(null)}
        onUpdated={reloadEvents}
        onDeleted={reloadEvents}
      />
    </div>
  );
}

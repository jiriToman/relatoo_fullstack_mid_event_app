import eventsStrings from "@/lib/strings/pages/events.json";

type EventsPaginationProps = {
  page: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
};

export function EventsPagination({
  page,
  totalPages,
  onPrevious,
  onNext,
}: EventsPaginationProps) {
  return (
    <div className="mt-6 flex items-center justify-between">
      <button
        type="button"
        onClick={onPrevious}
        disabled={page <= 1}
        className="rounded-[5px] border border-relatoo-gray-light px-3 py-2 text-sm text-relatoo-dark disabled:opacity-50"
      >
        {eventsStrings.page.previous}
      </button>

      <p className="text-sm text-relatoo-gray">
        {eventsStrings.page.page} {page} {eventsStrings.page.of} {totalPages}
      </p>

      <button
        type="button"
        onClick={onNext}
        disabled={page >= totalPages}
        className="rounded-[5px] border border-relatoo-gray-light px-3 py-2 text-sm text-relatoo-dark disabled:opacity-50"
      >
        {eventsStrings.page.next}
      </button>
    </div>
  );
}

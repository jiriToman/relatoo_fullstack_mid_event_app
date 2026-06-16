import type { FormEvent } from "react";

import type { EventStatus } from "@/lib/api";
import {
  type EventsFilterForm,
  isDateRangeInvalid,
} from "@/lib/events/filters";
import eventsStrings from "@/lib/strings/pages/events.json";

const EVENT_STATUSES: EventStatus[] = ["draft", "published", "cancelled"];

type EventsFiltersProps = {
  value: EventsFilterForm;
  onChange: (value: EventsFilterForm) => void;
  onApply: () => void;
  onClear: () => void;
};

const inputClassName =
  "w-full rounded-[5px] border border-relatoo-gray-light bg-white px-3 py-2 text-sm text-relatoo-dark outline-none transition focus:border-relatoo-green focus:ring-2 focus:ring-relatoo-green/30";

const invalidInputClassName =
  "w-full rounded-[5px] border border-relatoo-error bg-white px-3 py-2 text-sm text-relatoo-dark outline-none transition focus:border-relatoo-error focus:ring-2 focus:ring-relatoo-error/30";

export function EventsFilters({
  value,
  onChange,
  onApply,
  onClear,
}: EventsFiltersProps) {
  const strings = eventsStrings.components.filters;
  const isToDisabled = !value.from;
  const isToInvalid = isDateRangeInvalid(value);

  function updateField<K extends keyof EventsFilterForm>(
    field: K,
    fieldValue: EventsFilterForm[K],
  ) {
    onChange({ ...value, [field]: fieldValue });
  }

  function handleFromChange(from: string) {
    if (!from) {
      onChange({ ...value, from: "", to: "" });
      return;
    }

    onChange({ ...value, from });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isToInvalid) {
      return;
    }

    onApply();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 grid gap-4 rounded-[5px] border border-relatoo-gray-light bg-relatoo-green-pale/30 p-4 md:grid-cols-2 lg:grid-cols-4"
    >
      <div>
        <label htmlFor="event-status" className="mb-1.5 block text-sm font-medium text-relatoo-dark">
          {strings.statusLabel}
        </label>
        <select
          id="event-status"
          value={value.status}
          onChange={(event) =>
            updateField("status", event.target.value as EventsFilterForm["status"])
          }
          className={inputClassName}
        >
          <option value="">{strings.statusAll}</option>
          {EVENT_STATUSES.map((status) => (
            <option key={status} value={status}>
              {eventsStrings.status[status]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="event-from" className="mb-1.5 block text-sm font-medium text-relatoo-dark">
          {strings.fromLabel}
        </label>
        <input
          id="event-from"
          type="date"
          value={value.from}
          onChange={(event) => handleFromChange(event.target.value)}
          className={inputClassName}
        />
      </div>

      <div>
        <label htmlFor="event-to" className="mb-1.5 block text-sm font-medium text-relatoo-dark">
          {strings.toLabel}
        </label>
        <input
          id="event-to"
          type="date"
          value={value.to}
          min={value.from || undefined}
          disabled={isToDisabled}
          aria-invalid={isToInvalid}
          aria-describedby={isToInvalid ? "event-to-error" : undefined}
          onChange={(event) => updateField("to", event.target.value)}
          className={
            isToInvalid
              ? invalidInputClassName
              : `${inputClassName} disabled:cursor-not-allowed disabled:bg-relatoo-gray-light/50 disabled:text-relatoo-gray`
          }
        />
        {isToDisabled ? (
          <p className="mt-1 text-xs text-relatoo-gray">{strings.toDisabledHint}</p>
        ) : null}
        {isToInvalid ? (
          <p id="event-to-error" className="mt-1 text-xs text-relatoo-error">
            {strings.toInvalid}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="event-title" className="mb-1.5 block text-sm font-medium text-relatoo-dark">
          {strings.titleLabel}
        </label>
        <input
          id="event-title"
          type="search"
          value={value.title}
          onChange={(event) => updateField("title", event.target.value)}
          placeholder={strings.titlePlaceholder}
          className={inputClassName}
        />
      </div>

      <div className="flex items-end gap-2 md:col-span-2 lg:col-span-4">
        <button
          type="submit"
          disabled={isToInvalid}
          className="rounded-[5px] bg-relatoo-green px-4 py-2 text-sm font-semibold text-relatoo-dark transition hover:bg-relatoo-green-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {strings.apply}
        </button>
        <button
          type="button"
          onClick={onClear}
          className="rounded-[5px] border border-relatoo-gray-light bg-white px-4 py-2 text-sm font-medium text-relatoo-dark transition hover:border-relatoo-green hover:text-relatoo-green-dark"
        >
          {strings.clear}
        </button>
      </div>
    </form>
  );
}

import type { EventStatus } from "@/lib/api";
import { EVENT_STATUSES, getEventStatusLabel } from "@/lib/events/display";
import eventsStrings from "@/lib/strings/pages/events.json";

const selectClassName =
  "w-full rounded-[5px] border border-relatoo-gray-light bg-white px-3 py-2 text-sm text-relatoo-dark outline-none transition focus:border-relatoo-green focus:ring-2 focus:ring-relatoo-green/30";

type EventStatusSelectProps = {
  id: string;
  value: EventStatus | "";
  onChange: (value: EventStatus | "") => void;
  label?: string;
  includeAll?: boolean;
};

export function EventStatusSelect({
  id,
  value,
  onChange,
  label,
  includeAll = false,
}: EventStatusSelectProps) {
  return (
    <div>
      {label ? (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-relatoo-dark">
          {label}
        </label>
      ) : null}
      <select
        id={id}
        value={value}
        onChange={(event) =>
          onChange(event.target.value as EventStatus | "")
        }
        className={selectClassName}
      >
        {includeAll ? (
          <option value="">{eventsStrings.components.filters.statusAll}</option>
        ) : null}
        {EVENT_STATUSES.map((status) => (
          <option key={status} value={status}>
            {getEventStatusLabel(status)}
          </option>
        ))}
      </select>
    </div>
  );
}

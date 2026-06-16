import type { Event } from "@/lib/api";
import { formatEventDate, getEventStatusLabel } from "@/lib/events/display";
import eventsStrings from "@/lib/strings/pages/events.json";

type EventsTableProps = {
  events: Event[];
  onDetailClick: (eventId: string) => void;
};

export function EventsTable({ events, onDetailClick }: EventsTableProps) {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-relatoo-gray-light text-relatoo-gray">
            <th className="px-3 py-2">{eventsStrings.table.title}</th>
            <th className="px-3 py-2">{eventsStrings.table.date}</th>
            <th className="px-3 py-2">{eventsStrings.table.status}</th>
            <th className="px-3 py-2">{eventsStrings.table.location}</th>
            <th className="px-3 py-2">{eventsStrings.table.actions}</th>
          </tr>
        </thead>
        <tbody>
          {events.map((eventItem) => (
            <tr key={eventItem._id} className="border-b border-relatoo-gray-light/70">
              <td className="px-3 py-3 font-medium text-relatoo-dark">
                {eventItem.title}
              </td>
              <td className="px-3 py-3 text-relatoo-gray">
                {formatEventDate(eventItem.date)}
              </td>
              <td className="px-3 py-3 text-relatoo-dark">
                {getEventStatusLabel(eventItem.status)}
              </td>
              <td className="px-3 py-3 text-relatoo-gray">
                {eventItem.location ?? "—"}
              </td>
              <td className="px-3 py-3">
                <button
                  type="button"
                  onClick={() => onDetailClick(eventItem._id)}
                  className="rounded-[5px] border border-relatoo-gray-light px-3 py-1.5 text-xs font-medium text-relatoo-dark transition hover:border-relatoo-green hover:text-relatoo-green-dark"
                >
                  {eventsStrings.table.detail}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

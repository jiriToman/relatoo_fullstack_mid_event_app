import type { Event } from "@/lib/api";
import eventsStrings from "@/lib/strings/pages/events.json";

type EventsTableProps = {
  events: Event[];
};

function formatDate(value: string): string {
  return new Date(value).toLocaleString("cs-CZ");
}

function getStatusLabel(status: Event["status"]): string {
  return eventsStrings.status[status];
}

export function EventsTable({ events }: EventsTableProps) {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-relatoo-gray-light text-relatoo-gray">
            <th className="px-3 py-2">{eventsStrings.table.title}</th>
            <th className="px-3 py-2">{eventsStrings.table.date}</th>
            <th className="px-3 py-2">{eventsStrings.table.status}</th>
            <th className="px-3 py-2">{eventsStrings.table.location}</th>
          </tr>
        </thead>
        <tbody>
          {events.map((eventItem) => (
            <tr key={eventItem._id} className="border-b border-relatoo-gray-light/70">
              <td className="px-3 py-3 font-medium text-relatoo-dark">
                {eventItem.title}
              </td>
              <td className="px-3 py-3 text-relatoo-gray">
                {formatDate(eventItem.date)}
              </td>
              <td className="px-3 py-3 text-relatoo-dark">
                {getStatusLabel(eventItem.status)}
              </td>
              <td className="px-3 py-3 text-relatoo-gray">
                {eventItem.location ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

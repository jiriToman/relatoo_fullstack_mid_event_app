import type { OpenApiOperation } from "@/lib/openapi/parse-paths";
import homeStrings from "@/lib/strings/pages/home.json";

type OpenApiListProps = {
  operations: OpenApiOperation[];
  apiTitle: string;
  apiVersion: string;
  docsUrl: string;
};

const METHOD_COLORS: Record<string, string> = {
  GET: "bg-relatoo-green-pale text-relatoo-green-dark",
  POST: "bg-blue-50 text-blue-700",
  PATCH: "bg-amber-50 text-amber-700",
  DELETE: "bg-red-50 text-relatoo-error",
  PUT: "bg-purple-50 text-purple-700",
};

export function OpenApiList({
  operations,
  apiTitle,
  apiVersion,
  docsUrl,
}: OpenApiListProps) {
  const strings = homeStrings.components.openApiList;

  return (
    <div className="mt-8 rounded-xl border border-relatoo-gray-light bg-white p-8 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-relatoo-dark">{strings.title}</h2>
          <p className="mt-2 text-sm text-relatoo-gray">
            {apiTitle} v{apiVersion} — {strings.description}
          </p>
        </div>
        <a
          href={docsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-[5px] border border-relatoo-gray-light px-4 py-2 text-sm font-medium text-relatoo-dark transition hover:border-relatoo-green hover:text-relatoo-green-dark"
        >
          {strings.swaggerLink}
        </a>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-relatoo-gray-light text-relatoo-gray">
              <th className="px-3 py-2">{strings.method}</th>
              <th className="px-3 py-2">{strings.path}</th>
              <th className="px-3 py-2">{strings.operationId}</th>
              <th className="px-3 py-2">{strings.tags}</th>
              <th className="px-3 py-2">{strings.summary}</th>
            </tr>
          </thead>
          <tbody>
            {operations.map((operation) => (
              <tr
                key={`${operation.method}-${operation.path}`}
                className="border-b border-relatoo-gray-light/70"
              >
                <td className="px-3 py-3">
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-semibold ${
                      METHOD_COLORS[operation.method] ?? "bg-relatoo-gray-light text-relatoo-dark"
                    }`}
                  >
                    {operation.method}
                  </span>
                </td>
                <td className="px-3 py-3 font-mono text-relatoo-dark">{operation.path}</td>
                <td className="px-3 py-3 text-relatoo-gray">{operation.operationId ?? "—"}</td>
                <td className="px-3 py-3 text-relatoo-gray">
                  {operation.tags.length > 0 ? operation.tags.join(", ") : "—"}
                </td>
                <td className="px-3 py-3 text-relatoo-gray">{operation.summary ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

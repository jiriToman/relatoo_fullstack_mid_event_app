import { api } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function Home() {
  let welcome: string | null = null;
  let health: Awaited<ReturnType<typeof api.getHealth>> | null = null;
  let error: string | null = null;

  try {
    const [welcomeRes, healthRes] = await Promise.all([
      api.getWelcome(),
      api.getHealth(),
    ]);
    welcome = welcomeRes.message;
    health = healthRes;
  } catch (e) {
    error =
      e instanceof Error
        ? e.message
        : "Could not reach the backend API. Is it running on port 3000?";
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <main className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Event App
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Next.js frontend connected to the Express REST API.
        </p>

        {error ? (
          <div
            role="alert"
            className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200"
          >
            {error}
          </div>
        ) : (
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">API</dt>
              <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                {welcome}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">Status</dt>
              <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                {health?.status}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">Database</dt>
              <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                {health?.database}
              </dd>
            </div>
          </dl>
        )}
      </main>
    </div>
  );
}

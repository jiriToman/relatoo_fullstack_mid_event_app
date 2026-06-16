import { AuthGate } from "@/components/auth/auth-gate";
import { LogoutButton } from "@/components/auth/logout-button";
import { api } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function Home() {
  let welcome: string | null = null;
  let error: string | null = null;

  try {
    const welcomeRes = await api.getWelcome();
    welcome = welcomeRes.message;
  } catch (e) {
    error =
      e instanceof Error
        ? e.message
        : "Could not reach the backend API. Is it running on port 3000?";
  }

  return (
    <AuthGate>
      <div className="flex flex-1 flex-col bg-relatoo-gray-light">
        <header className="border-b border-relatoo-gray-light bg-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-relatoo-green-dark">
                Event App
              </p>
              <h1 className="text-lg font-semibold text-relatoo-dark">
                Administrace
              </h1>
            </div>
            <LogoutButton />
          </div>
        </header>

        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
          <div className="rounded-xl border border-relatoo-gray-light bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-relatoo-dark">
              Přehled systému
            </h2>
            <p className="mt-2 text-sm text-relatoo-gray">
              Připojení k Express REST API.
            </p>

            {error ? (
              <div
                role="alert"
                className="mt-6 rounded-[5px] border border-relatoo-error/30 bg-relatoo-error/10 px-4 py-3 text-sm text-relatoo-error"
              >
                {error}
              </div>
            ) : (
              <dl className="mt-6 divide-y divide-relatoo-gray-light">
                <div className="flex justify-between gap-4 py-3 text-sm">
                  <dt className="text-relatoo-gray">API</dt>
                  <dd className="font-medium text-relatoo-dark">{welcome}</dd>
                </div>
              </dl>
            )}
          </div>
        </main>
      </div>
    </AuthGate>
  );
}

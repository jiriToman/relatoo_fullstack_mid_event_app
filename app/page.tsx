import { AuthGate } from "@/components/auth/auth-gate";
import { AdminTopNav } from "@/components/layout/admin-top-nav";
import { api } from "@/lib/api";
import commonStrings from "@/lib/strings/common.json";
import homeStrings from "@/lib/strings/pages/home.json";

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
        : homeStrings.errors.apiUnavailable;
  }

  return (
    <AuthGate>
      <div className="flex flex-1 flex-col bg-relatoo-gray-light">
        <AdminTopNav pageTitle={commonStrings.adminSection} />

        <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
          <div className="rounded-xl border border-relatoo-gray-light bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-relatoo-dark">
              {homeStrings.page.systemOverviewTitle}
            </h2>
            <p className="mt-2 text-sm text-relatoo-gray">
              {homeStrings.page.systemOverviewDescription}
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
                  <dt className="text-relatoo-gray">{commonStrings.apiLabel}</dt>
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

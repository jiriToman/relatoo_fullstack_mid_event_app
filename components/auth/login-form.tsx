"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

import { api } from "@/lib/api";
import { getErrorMessage } from "@/lib/api/get-error-message";
import { setAuthToken } from "@/lib/auth/token";
import loginStrings from "@/lib/strings/pages/login.json";

const strings = loginStrings.components.loginForm;

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await api.login({ username, password });
      setAuthToken(response.token);
      router.push("/");
      router.refresh();
    } catch (submitError) {
      setError(getErrorMessage(submitError, strings.genericError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-relatoo-dark px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Image
            src="/relatoo-logo.svg"
            alt={strings.logoAlt}
            width={161}
            height={46}
            priority
          />
        </div>

        <div className="rounded-xl bg-relatoo-dark-soft px-8 py-10 shadow-2xl ring-1 ring-white/10">
          <h1 className="text-center text-2xl font-semibold text-white">
            {strings.title}
          </h1>
          <p className="mt-2 text-center text-sm text-relatoo-gray-mid">
            {strings.subtitle}
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="mb-1.5 block text-sm font-medium text-white"
              >
                {strings.usernameLabel}
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full rounded-[5px] border border-white/10 bg-relatoo-dark px-4 py-3 text-sm text-white outline-none transition focus:border-relatoo-green focus:ring-2 focus:ring-relatoo-green/30"
                placeholder={strings.usernamePlaceholder}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-white"
              >
                {strings.passwordLabel}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-[5px] border border-white/10 bg-relatoo-dark px-4 py-3 text-sm text-white outline-none transition focus:border-relatoo-green focus:ring-2 focus:ring-relatoo-green/30"
                placeholder={strings.passwordPlaceholder}
              />
            </div>

            {error ? (
              <div
                role="alert"
                className="rounded-[5px] border border-relatoo-error/30 bg-relatoo-error/10 px-4 py-3 text-sm text-relatoo-error"
              >
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-[5px] bg-relatoo-green px-4 py-3 text-sm font-semibold text-relatoo-dark transition hover:bg-relatoo-green-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? strings.submitLoading : strings.submitIdle}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-relatoo-gray">
          {strings.footer}
        </p>
      </div>
    </div>
  );
}

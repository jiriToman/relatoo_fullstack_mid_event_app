import { apiFetch } from "./client";
import type {
  Event,
  ListEventsFilters,
  LoginRequest,
  LoginResponse,
  WelcomeResponse,
} from "./types";

export { ApiError } from "./client";
export type {
  ErrorResponse,
  Event,
  EventStatus,
  ListEventsFilters,
  LoginRequest,
  LoginResponse,
  WelcomeResponse,
} from "./types";

function buildEventsQuery(filters?: ListEventsFilters): string {
  if (!filters) {
    return "";
  }

  const params = new URLSearchParams();

  if (filters.status) {
    params.set("status", filters.status);
  }
  if (filters.from) {
    params.set("from", filters.from);
  }
  if (filters.to) {
    params.set("to", filters.to);
  }
  if (filters.title?.trim()) {
    params.set("title", filters.title.trim());
  }

  const query = params.toString();
  return query ? `?${query}` : "";
}

export const api = {
  getWelcome: () => apiFetch<WelcomeResponse>("/"),

  login: (credentials: LoginRequest) =>
    apiFetch<LoginResponse>("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    }),

  listEvents: (token: string, filters?: ListEventsFilters) =>
    apiFetch<Event[]>(`/api/events${buildEventsQuery(filters)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

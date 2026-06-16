import { apiFetch } from "./client";
import type {
  Event,
  ListEventsFilters,
  LoginRequest,
  LoginResponse,
  UpdateEventStatusRequest,
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
  UpdateEventStatusRequest,
  WelcomeResponse,
} from "./types";

function authHeaders(token: string): HeadersInit {
  return { Authorization: `Bearer ${token}` };
}

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
      headers: authHeaders(token),
    }),

  getEventById: (token: string, id: string) =>
    apiFetch<Event>(`/api/events/${id}`, {
      headers: authHeaders(token),
    }),

  updateEventStatus: (
    token: string,
    id: string,
    body: UpdateEventStatusRequest,
  ) =>
    apiFetch<Event>(`/api/events/${id}/status`, {
      method: "PATCH",
      headers: {
        ...authHeaders(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }),

  deleteEvent: (token: string, id: string) =>
    apiFetch<void>(`/api/events/${id}`, {
      method: "DELETE",
      headers: authHeaders(token),
    }),
};

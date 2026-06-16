import { apiFetch } from "./client";
import type {
  Event,
  LoginRequest,
  LoginResponse,
  WelcomeResponse,
} from "./types";

export { ApiError } from "./client";
export type {
  ErrorResponse,
  Event,
  EventStatus,
  LoginRequest,
  LoginResponse,
  WelcomeResponse,
} from "./types";

export const api = {
  getWelcome: () => apiFetch<WelcomeResponse>("/"),

  login: (credentials: LoginRequest) =>
    apiFetch<LoginResponse>("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    }),

  listEvents: (token: string) =>
    apiFetch<Event[]>("/api/events", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

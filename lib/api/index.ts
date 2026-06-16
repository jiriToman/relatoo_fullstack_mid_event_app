import { apiFetch } from "./client";
import type { HealthResponse, WelcomeResponse } from "./types";

export { ApiError } from "./client";
export type { HealthResponse, WelcomeResponse } from "./types";

export const api = {
  getWelcome: () => apiFetch<WelcomeResponse>("/"),

  getHealth: () => apiFetch<HealthResponse>("/health"),
};

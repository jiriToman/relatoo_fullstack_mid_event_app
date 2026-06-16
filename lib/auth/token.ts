import {
  AUTH_INACTIVITY_TIMEOUT_MS,
  AUTH_LAST_ACTIVITY_KEY,
  AUTH_TOKEN_KEY,
} from "./constants";

function nowMs(): number {
  return Date.now();
}

export function touchAuthActivity(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(AUTH_LAST_ACTIVITY_KEY, String(nowMs()));
}

function getLastActivityMs(): number | null {
  if (typeof window === "undefined") {
    return null;
  }

  const value = localStorage.getItem(AUTH_LAST_ACTIVITY_KEY);
  if (!value) {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setAuthToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  touchAuthActivity();
}

export function clearAuthToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_LAST_ACTIVITY_KEY);
}

export function isAuthExpiredByInactivity(): boolean {
  const lastActivityMs = getLastActivityMs();
  if (!lastActivityMs) {
    return true;
  }

  return nowMs() - lastActivityMs > AUTH_INACTIVITY_TIMEOUT_MS;
}

export function isAuthenticated(): boolean {
  const token = getAuthToken();
  if (!token) {
    return false;
  }

  if (isAuthExpiredByInactivity()) {
    clearAuthToken();
    return false;
  }

  return true;
}

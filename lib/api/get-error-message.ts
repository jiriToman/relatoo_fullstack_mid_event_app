import { ApiError, type ErrorResponse } from "@/lib/api";

export function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof ApiError) {
    const body = error.body as ErrorResponse | undefined;
    if (body?.description) {
      return body.description;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}

import type { components, operations } from "./generated/schema";

export type WelcomeResponse = components["schemas"]["WelcomeResponse"];
export type LoginRequest = components["schemas"]["LoginRequest"];
export type LoginResponse = components["schemas"]["LoginResponse"];
export type ErrorResponse = components["schemas"]["ErrorResponse"];
export type Event = components["schemas"]["Event"];
export type EventStatus = components["schemas"]["EventStatus"];

export type ListEventsFilters = NonNullable<
  operations["listEvents"]["parameters"]["query"]
>;

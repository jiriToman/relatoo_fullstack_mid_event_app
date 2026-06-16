/** Hand-written types mirroring openapi/openapi.yaml — regenerate with `npm run api:types`. */

export type WelcomeResponse = {
  message: string;
};

export type HealthResponse = {
  status: "ok";
  database: "connected" | "connecting" | "disconnected";
  timestamp: string;
};

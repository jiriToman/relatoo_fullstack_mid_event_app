# Event App — Frontend

React + Next.js + TypeScript frontend for the Event App.

## Prerequisites

- [Node.js](https://nodejs.org/) (v20+)
- Backend API running at [http://localhost:3000](http://localhost:3000) — see the [backend README](../https-github.com-jiriToman-relatoo_fullstack_mid_event_app_BE/README.md)

## Setup

```bash
npm install
cp .env.example .env.local
```

## Development

```bash
npm run dev
```

Frontend runs at [http://localhost:3001](http://localhost:3001) (port 3001 avoids conflict with the backend on 3000).

## API contract (OpenAPI)

The **backend owns the OpenAPI spec**. It is generated from route JSDoc annotations and auto-updated on every backend commit.

| Piece | Location |
|-------|----------|
| Source of truth | Backend `openapi/openapi.json` (generated) |
| Live spec | [http://localhost:3000/openapi.json](http://localhost:3000/openapi.json) |
| Swagger UI | [http://localhost:3000/api-docs](http://localhost:3000/api-docs) |
| Frontend types | `lib/api/generated/schema.d.ts` |

Regenerate frontend types after backend API changes:

```bash
npm run api:types
```

## Project structure

```
app/              # Next.js App Router pages
lib/api/          # API client & types
```

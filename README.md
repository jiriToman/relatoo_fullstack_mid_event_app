# Event App — Frontend

Next.js admin UI for the Event App REST API.

**Backend:** [README](../https-github.com-jiriToman-relatoo_fullstack_mid_event_app_BE/README.md) · port `3000`

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3001/login](http://localhost:3001/login) — credentials from backend `.env` (`ADMIN_USERNAME` / `ADMIN_PASSWORD`).

Session expires after 15 minutes of inactivity.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Dashboard |
| `/events` | Event list (filters, pagination, detail modal) |
| `/events/new` | Create event |
| `/login` | Admin login |

Top nav (Přehled · Seznam událostí · Nová událost) is on dashboard and event list only.

## Scripts

```bash
npm run dev          # port 3001
npm run build
npm run api:types    # sync types from backend openapi/openapi.json
```


## Structure

```
app/              routes
components/       UI (auth, events, layout)
lib/api/          REST client + OpenAPI types
lib/strings/      UI copy (JSON)
```

# Event App — Frontend

Next.js + React + TypeScript admin UI for the Event App REST API.

**Backend:** [../https-github.com-jiriToman-relatoo_fullstack_mid_event_app_BE/README.md](../https-github.com-jiriToman-relatoo_fullstack_mid_event_app_BE/README.md) (Express, port 3000)

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

App: [http://localhost:3001](http://localhost:3001) · Login: [/login](http://localhost:3001/login) (backend `ADMIN_USERNAME` / `ADMIN_PASSWORD`)

Auth session expires after 15 minutes of inactivity.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server (port 3001) |
| `npm run build` | Production build |
| `npm run api:types` | Regenerate types from backend `openapi/openapi.json` |

## Layout

```
app/                 # pages
components/          # UI (auth, etc.)
lib/api/             # REST client + generated types
lib/strings/         # UI copy (common.json + pages/*.json)
```

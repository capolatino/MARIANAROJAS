# AGENTS.md

## Cursor Cloud specific instructions

This is a single **Next.js 14 (App Router) + TypeScript** app ("Mariana Rojas - Sistema de Reservas"): a salon booking system. It uses **Prisma ORM + PostgreSQL**, **NextAuth** (credentials) for the admin panel, and optional Mercado Pago / email integrations. There is no monorepo and no test framework — "testing" is manual/E2E against the running app. Standard commands live in `package.json` scripts and `README.md`.

### Environment files (important)
- Prisma CLI (`db:push`, `db:seed`, `db:studio`) reads **`.env`**, while Next.js reads **`.env.local`** (and `.env`). Both files exist in the cloud VM (gitignored `.env.local`; untracked `.env`) with matching dev values. If you change `DATABASE_URL`, update **both** files.
- The `postinstall` hook runs `prisma generate` automatically, so the update script only needs `npm install`.

### PostgreSQL (must be running for anything DB-backed)
- PostgreSQL 16 is installed in the VM but is **not auto-started on boot**. Start it before running the app or Prisma commands:
  - `sudo pg_ctlcluster 16 main start`
- Local dev connection (already in `.env` / `.env.local`): user `postgres`, password `postgres`, db `marianarojas` on `localhost:5432`.
- On a fresh DB, run `npx prisma db push` then `npm run db:seed` (seeds the admin user + 8 services + holiday blocks). These are already applied in the VM snapshot.

### Running the app
- Dev server: `npm run dev` → http://localhost:3000 (single process serves both the UI and the `/api/*` routes).
- Lint: `npm run lint`. Build: `npm run build`.
- Node: `.nvmrc` pins 18.17.0, but the app builds and runs fine on the VM's default Node 22 (engines is `>=18.17.0`).

### Seeded admin credentials
- Email `admin@marianarojas.com`, password `cambiar123` (overridable via `ADMIN_EMAIL` / `ADMIN_PASSWORD`).

### Known caveats (pre-existing app behavior, not env issues)
- **Admin login is broken**: `middleware.ts` matches `/admin/:path*`, which also protects the sign-in page `/admin/login`, producing an `ERR_TOO_MANY_REDIRECTS` loop (and eventually HTTP 431). This is an application bug, not a setup problem — do not treat it as an environment failure.
- The public booking wizard at `/turnos` uses **mock/client-side data** (see `mockServices` in `app/turnos/page.tsx`); the calendar is a placeholder and the wizard's confirmation does not persist to the DB. The real DB-backed booking path is the `/api/customers` and `/api/bookings/*` routes.
- `bookingSchema` in `lib/validations.ts` uses `z.date()`, so `POST /api/bookings/create` rejects raw JSON date strings. `/api/customers` and `/api/services` work with plain JSON.
- Mercado Pago (`MP_ACCESS_TOKEN`) and email (`RESEND_API_KEY`/SMTP) are only needed to exercise the payment/email steps; browsing, service listing, and customer creation work without them.

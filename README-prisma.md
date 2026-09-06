# Prisma setup for Clear Choice Media

## 1) Create the database

Use PostgreSQL in Supabase, Neon, Railway, or another managed provider.

Example connection string:

```bash
DATABASE_URL="postgresql://username:password@host:5432/clear_choice_media?schema=public"
```

## 2) Install dependencies

This project already includes the Prisma packages.

## 3) Generate Prisma client

The project uses Prisma 7’s config-based setup. The CLI reads the datasource from `prisma7.config.ts`.

```bash
npm run db:generate
```

## 4) Run migrations

```bash
npm run db:migrate
```

## 5) Seed the owner/admin user

```bash
ADMIN_EMAIL="owner@clearchoicemedia.com" ADMIN_PASSWORD="ChangeThisPassword123!" npx tsx scripts/seed-admin.ts
```

## 6) Start the app

```bash
npm run dev
```

## 7) Sign in

Go to:

```text
http://localhost:3001/admin/login
```

Use the seeded admin email and password.

## Recommended production stack

- PostgreSQL via Prisma
- Cloudinary for uploads
- JWT cookie auth
- Supabase Auth or custom admin auth if you want a hosted auth service

This keeps the content in a real database while still giving you the JWT-based owner login flow you asked for.

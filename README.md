# IRIS Landing Page v2

A cinematic, single-page product landing website for **IRIS Smartglasses**, built with Next.js, TypeScript, Tailwind CSS, and GSAP.

## What This Folder Contains

- A full Next.js App Router project for the IRIS marketing landing page.
- Rich media assets (videos/images) used in hero and feature sections.
- Animated scroll reveals and parallax effects powered by GSAP + ScrollTrigger.
- A minimal API route at `/api` for backend extension.
- Prisma setup (SQLite schema) available for future data features.

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- GSAP (animations)
- Prisma (SQLite-ready schema)

## Prerequisites

- Node.js `20.x` (or newer LTS)
- npm `10+`

## How To Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open:

`http://localhost:3000`

## Production Build

1. Build:

```bash
npm run build
```

2. Start production server:

```bash
npm run start
```

## Lint

```bash
npm run lint
```

## Environment / Database Notes

This project includes Prisma config (`prisma/schema.prisma`) with SQLite datasource.

If you plan to use Prisma features, copy `.env.example` to `.env` (or create `.env`) with:

```env
DATABASE_URL="file:./db/custom.db"
```

Then run:

```bash
npm run db:generate
npm run db:push
```

## Key Structure

- `src/app/page.tsx`: Main IRIS landing page UI and animations
- `src/app/api/route.ts`: Example API endpoint
- `public/upload/`: Public media assets used by the page
- `prisma/schema.prisma`: Database schema

## Ready To Push Checklist

- `npm install` succeeds
- `npm run lint` passes
- `npm run build` succeeds
- `npm run start` launches successfully

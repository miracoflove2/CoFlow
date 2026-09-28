# CoFlow

[English](README.md) | [简体中文](README.zh-CN.md)

CoFlow is a human governed engineering control plane for turning design and other source artifacts into reviewed implementation work. This repository is the first runnable foundation, not a completed product.

## Stack

- pnpm workspace + Turborepo
- Next.js App Router, React, TypeScript, Tailwind CSS, shadcn/ui-compatible local components
- NestJS modular monolith
- PostgreSQL, Redis and BullMQ

## Local start

Requires Node.js 20.9+, pnpm 11 and Docker Compose.

1. Copy `.env.example` to `.env`; replace `JWT_SECRET` before using authentication.
2. Run `docker compose up -d`.
3. Run `pnpm install`.
4. Run `pnpm db:migrate`.
5. Run `pnpm dev`.

Open http://localhost:3000. The API health endpoint is http://localhost:4000/health.

Authentication endpoints are `POST /auth/register` and `POST /auth/login` with JSON `{ "username": "...", "password": "..." }`. Registration is open for local MVP development and must be governed before deployment. `GET /projects` and `POST /projects` require `Authorization: Bearer <token>`.

## Scope and boundaries

See [architecture](docs/architecture.md), [domain model](docs/domain-model.md), and [integration plan](docs/integrations.md). The initial migration creates the core tables. Figma OAuth, resource import, webhook delivery and version creation are specified interfaces and follow-on implementation work; no credentials or external integration are active yet. The GitHub and AI Provider boundaries are defined without claiming live execution.

# Architecture

## Modules

`apps/web` is the operator UI. `apps/server` owns API, domain rules, PostgreSQL access and BullMQ producers. `apps/worker` owns background jobs. The database is the source of truth; Redis/BullMQ transports work and is not a system of record.

The current executable slice is account registration/login, health status, and project creation/listing. Remaining domain modules have dedicated folders and schema tables to make boundaries explicit. Their routes and behavior must be built alongside acceptance criteria rather than inferred from designs.

## Dependency direction

UI → API contracts → application modules → domain rules → database/integration adapters. External providers return normalized artifacts and evidence. Workflow transitions require server-side policy checks and human decisions where specified.

## Planned delivery sequence

1. Project membership and roles; implementation contract and artifact API.
2. Figma OAuth with encrypted token storage, resource selection and initial import.
3. Verified webhook ingestion, idempotent job dispatch, immutable ArtifactVersion snapshots.
4. Traceability, work items, review and decision flow.
5. GitHub connector and OpenAI provider through explicit execution contracts.

The server and worker are separate processes over shared packages, while the domain remains one deployable logical system.

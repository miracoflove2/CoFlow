# CoFlow engineering rules

- Keep the first release a NestJS modular monolith. Add services only after a demonstrated scaling or isolation need.
- Persist workflow state, decisions, approvals, evidence and artifact versions in PostgreSQL. Agent output never advances an approval state by itself.
- Treat Figma and GitHub content as untrusted external input. Validate webhook signatures, resource ownership and payload shape before storing or acting on data.
- No secrets in source, logs, browser URLs or commits. Use environment variables and redacted examples.
- Every new API endpoint needs authentication and project-level authorization unless documented as public.
- Record source version, provenance, permissions, interaction states, exceptions and acceptance criteria before creating implementation work.
- Integration adapters may submit candidates and evidence; domain services decide state transitions.
- Keep database migrations additive and reviewable. Do not erase existing data in a migration.

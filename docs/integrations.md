# Integration contracts

## Figma

The `Connector` interface models authorization, resource listing, snapshot import and webhook validation. A complete adapter will exchange OAuth codes server-side, store encrypted credentials, expose only authorized files, normalize imported content, validate webhook signatures, deduplicate events, enqueue imports, and append immutable `artifact_versions`. An update never silently rewrites the active implementation contract. Figma credentials and webhook configuration are still required.

## GitHub

The connector boundary reserves repository identity, installation scope, commit/PR references and webhook events. No GitHub App is configured in this foundation.

## AI providers

`AiProvider` accepts a bounded task and returns an output artifact plus usage/evidence metadata. `OpenAiProvider` is an explicit stub until an API key, model and execution policy are selected. Codex and additional providers can implement the same contract. Human review and workflow policy own acceptance.

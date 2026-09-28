# Domain model

The initial SQL migration creates users, projects, memberships, integrations, artifacts, artifact versions, implementation contracts, trace links, workflows, work items, reviews, decisions, change sets, impact analyses and agent executions. Versions and decisions are append-oriented. Foreign keys retain provenance.

`Project` scopes permissions. `Artifact` identifies an external or local source; `ArtifactVersion` is an immutable captured state. `ImplementationContract` records verified interaction, state, exception, permission and acceptance requirements. `TraceLink` connects versions to work and decisions. `Workflow` and `WorkItem` track progress. `Review` and `Decision` record human authority. `ChangeSet` and `ImpactAnalysis` explain a proposed change. `AgentExecution` records bounded automated work. `Integration` records an external connection without exposing credentials to clients.

The schema is groundwork; most domain commands and authorization checks are intentionally pending implementation. No table should be interpreted as proof that an end-to-end workflow already exists.

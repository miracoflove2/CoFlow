export type ArtifactKind = 'figma' | 'github' | 'local';
export type DecisionOutcome = 'approved' | 'rejected' | 'changes_requested';
export type WorkItemStatus = 'draft' | 'ready' | 'in_progress' | 'review' | 'done';
export interface ExecutionEvidence { source: string; reference: string; capturedAt: string }

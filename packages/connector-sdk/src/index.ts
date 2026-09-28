export interface ExternalResource { id: string; name: string; kind: string; revision?: string }
export interface ImportedArtifact { sourceId: string; sourceRevision: string; content: unknown; capturedAt: string }
export interface Connector {
  readonly provider: string;
  listResources(credentialRef: string): Promise<ExternalResource[]>;
  importResource(credentialRef: string, resourceId: string): Promise<ImportedArtifact>;
  verifyWebhook(rawBody: Uint8Array, signature: string): Promise<boolean>;
}

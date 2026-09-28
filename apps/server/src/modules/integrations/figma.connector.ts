import type { Connector, ExternalResource, ImportedArtifact } from '@coflow/connector-sdk';

export class FigmaConnector implements Connector {
  readonly provider = 'figma';
  async listResources(_credentialRef: string): Promise<ExternalResource[]> { throw new Error('Figma OAuth and resource listing are not configured'); }
  async importResource(_credentialRef: string, _resourceId: string): Promise<ImportedArtifact> { throw new Error('Figma import is not configured'); }
  async verifyWebhook(_rawBody: Uint8Array, _signature: string): Promise<boolean> { throw new Error('Figma webhook verification is not configured'); }
}

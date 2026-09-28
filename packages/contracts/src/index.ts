export type Id = string;
export interface ProjectDto { id: Id; name: string; createdAt: string }
export interface ArtifactVersionDto { id: Id; artifactId: Id; version: number; sourceRevision?: string; capturedAt: string }
export interface AuthTokens { accessToken: string; tokenType: 'Bearer' }
export interface CreateProjectRequest { name: string }

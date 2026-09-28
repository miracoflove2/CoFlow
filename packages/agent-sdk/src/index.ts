export interface AiTask { id: string; projectId: string; instruction: string; inputRefs: string[] }
export interface AiResult { output: unknown; evidence: string[]; model: string; usage?: Record<string, number> }
export interface AiProvider { readonly id: string; execute(task: AiTask): Promise<AiResult> }

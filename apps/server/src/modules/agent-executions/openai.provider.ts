import type { AiProvider, AiResult, AiTask } from '@coflow/agent-sdk';

export class OpenAiProvider implements AiProvider {
  readonly id = 'openai';
  async execute(_task: AiTask): Promise<AiResult> { throw new Error('OpenAI model and execution policy are not configured'); }
}

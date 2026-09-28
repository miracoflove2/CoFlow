import { Worker } from 'bullmq';
import Redis from 'ioredis';
import { config } from 'dotenv';
import { resolve } from 'node:path';

config({ path: resolve(__dirname, '../../../.env') });

const connection = new Redis(process.env.REDIS_URL ?? 'redis://localhost:6379', { maxRetriesPerRequest: null });
const worker = new Worker('coflow-jobs', async (job) => {
  if (job.name === 'ping') return { ok: true, at: new Date().toISOString() };
  // Keep artifact-import unhandled until verified Figma import is implemented.
  throw new Error(`Unsupported job: ${job.name}`);
}, { connection });
worker.on('failed', (job, error) => console.error('Job failed', job?.id, error));
for (const signal of ['SIGINT', 'SIGTERM'] as const) process.on(signal, async () => { await worker.close(); await connection.quit(); process.exit(0); });

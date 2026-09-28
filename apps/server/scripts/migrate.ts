import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { Pool } from 'pg';
import { config } from 'dotenv';

config({ path: resolve(__dirname, '../../../.env') });

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL ?? 'postgresql://coflow:coflow_dev@localhost:5432/coflow' });
  try {
    await pool.query('CREATE TABLE IF NOT EXISTS schema_migrations (name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())');
    const dir = resolve(__dirname, '../../../infrastructure/database/migrations');
    for (const name of readdirSync(dir).filter((file) => file.endsWith('.sql')).sort()) {
      const applied = await pool.query('SELECT 1 FROM schema_migrations WHERE name=$1', [name]);
      if (applied.rowCount) continue;
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        await client.query(readFileSync(resolve(dir, name), 'utf8'));
        await client.query('INSERT INTO schema_migrations (name) VALUES ($1)', [name]);
        await client.query('COMMIT');
        console.log(`Applied ${name}`);
      } catch (error) { await client.query('ROLLBACK'); throw error; }
      finally { client.release(); }
    }
  } finally { await pool.end(); }
}
main().catch((error) => { console.error(error); process.exit(1); });

import { Global, Inject, Injectable, Module, OnModuleDestroy } from '@nestjs/common';
import { Pool, QueryResultRow } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private readonly pool = new Pool({ connectionString: process.env.DATABASE_URL ?? 'postgresql://coflow:coflow_dev@localhost:5432/coflow' });
  query<T extends QueryResultRow = QueryResultRow>(sql: string, values: unknown[] = []) { return this.pool.query<T>(sql, values); }
  async onModuleDestroy() { await this.pool.end(); }
}

@Global()
@Module({ providers: [DatabaseService], exports: [DatabaseService] })
export class DatabaseModule {}

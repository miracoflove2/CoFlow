import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { DatabaseService } from '../../infrastructure/database.module';
import Redis from 'ioredis';

@Controller('health')
export class HealthController {
  constructor(private readonly db: DatabaseService) {}
  @Get()
  async check() {
    const redis = new Redis(process.env.REDIS_URL ?? 'redis://localhost:6379', { lazyConnect: true, maxRetriesPerRequest: 1 });
    try {
      await this.db.query('SELECT 1');
      await redis.connect();
      await redis.ping();
      return { status: 'ok', postgres: 'ok', redis: 'ok' };
    } catch { throw new ServiceUnavailableException('Dependency unavailable'); }
    finally { redis.disconnect(); }
  }
}

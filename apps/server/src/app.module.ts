import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { HealthController } from './modules/health/health.controller';
import { DatabaseModule } from './infrastructure/database.module';
import { JobsModule } from './infrastructure/jobs.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectsModule } from './modules/projects/projects.module';

@Module({
  imports: [
    DatabaseModule,
    BullModule.forRoot({ connection: { url: process.env.REDIS_URL ?? 'redis://localhost:6379' } }),
    JobsModule,
    AuthModule,
    ProjectsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}

import { Injectable, Module } from '@nestjs/common';
import { BullModule, InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class JobsService {
  constructor(@InjectQueue('coflow-jobs') private readonly queue: Queue) {}

  enqueueArtifactImport(integrationId: string, resourceId: string) {
    return this.queue.add('artifact-import', { integrationId, resourceId }, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 1000 },
    });
  }
}

@Module({
  imports: [BullModule.registerQueue({ name: 'coflow-jobs' })],
  providers: [JobsService],
  exports: [JobsService],
})
export class JobsModule {}

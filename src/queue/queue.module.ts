import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MailModule } from 'src/mail/mail.module';
import { EmailQueueProcessor } from './email-queue.processor';
import { prototype } from 'events';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: 6379,
        password: process.env.REDIS_PASSWORD,
        maxRetriesPerRequest: 10,
        connectTimeout: 10000,
        retryStrategy: (times: number) => {
          return Math.min(times * 50, 2000);
        }
      },
    }),
    BullModule.registerQueue({
      name: 'email-queue',
    }),
    MailModule,
  ],
  providers: [EmailQueueProcessor],
  exports: [BullModule],
})
export class QueueModule {}

import { Module } from '@nestjs/common'
import { CronService } from './cron.service'

@Module({
  imports: [],
  controllers: [],
  providers: [CronService],
})
export class JobsModule {}

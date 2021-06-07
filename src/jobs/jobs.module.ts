import { Logger, Module } from '@nestjs/common'
import { CronService } from './cron.service'

@Module({
  imports: [],
  controllers: [],
  providers: [CronService, Logger],
})
export class JobsModule {}

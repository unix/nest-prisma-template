import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { PrismaService, TransientLoggerService } from '@/shared/services'

@Injectable()
export class CronService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: TransientLoggerService,
  ) {
    this.logger.setContext(CronService.name)
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async handleCron() {
    this.logger.debug(`Cron: demo done.`)
  }
}

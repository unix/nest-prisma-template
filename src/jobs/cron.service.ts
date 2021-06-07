import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { PrismaService } from '@/shared/services'

@Injectable()
export class CronService {
  constructor(private readonly prisma: PrismaService, private readonly logger: Logger) {
    this.logger.setContext(CronService.name)
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async handleCron() {
    this.logger.debug(`Cron: demo done.`)
  }
}

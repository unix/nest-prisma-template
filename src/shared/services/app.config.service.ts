import { AppConfigType } from '@/configs/constants/development'
import { APP_ENVS } from '@/configs/constants/envs'
import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'
import { TransientLoggerService } from './transient-logger.service'

@Injectable()
export class AppConfigService {
  private getCurrentEnv(): APP_ENVS {
    const env = process.env?.ENV
    const label = APP_ENVS[`${env}`.toUpperCase()]
    if (label) return label
    this.logger.setContext(AppConfigService.name)
    this.logger.error(`ENV is not standardized, fallback to ${APP_ENVS.DEVELOPMENT}`)
    return APP_ENVS.DEVELOPMENT
  }

  constructor(
    private readonly config: ConfigService,
    private readonly logger: TransientLoggerService,
  ) {
    logger.setContext(AppConfigService.name)
  }

  currentEnv: APP_ENVS = this.getCurrentEnv()

  get<T extends keyof AppConfigType>(key: T): AppConfigType[T] {
    const fallback = this.config.get(`${APP_ENVS.DEVELOPMENT}.${key}`)
    const value = this.config.get(`${this.currentEnv}.${key}`)
    return typeof value === 'undefined' ? fallback : value
  }
}

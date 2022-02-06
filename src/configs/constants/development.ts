import { registerAs } from '@nestjs/config'
import { APP_ENVS } from './envs'

const development = registerAs(APP_ENVS.DEVELOPMENT, () => ({
  PROMETHEUS_PORT: 9100,
  PROMETHEUS_NAME: 'nodejs-prisma-template',

  SENTRY_DSN: process.env.SENTRY || 'https://xxxxxxxxxxxxxxxxxx@sentry.io/10000',
}))

export default development

export type AppConfigType = Partial<ReturnType<typeof development>>

const development = {
  ENV_LABEL: 'DEVELOPMENT',

  PROMETHEUS_PORT: 9100,

  PROMETHEUS_NAME: 'nodejs-prisma-template',

  SENTRY_DSN: process.env.SENTRY || 'https://xxxxxxxxxxxxxxxxxx@sentry.io/10000',
}

export default development

export type EevRecord = typeof development

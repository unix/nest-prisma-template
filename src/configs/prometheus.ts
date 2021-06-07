import express from 'express'
import promBundle from 'express-prom-bundle'
import CONSTANTS from '@/configs/constants'
import { Logger } from '@nestjs/common'

const metricsRequestMiddleware = promBundle({
  includePath: true,
  includeMethod: true,
  autoregister: false,
  promClient: {
    collectDefaultMetrics: {},
  },
  customLabels: {
    app: CONSTANTS.PROMETHEUS_NAME,
  },
})

export const PrometheusInit = () => {
  const metricsApp = express()
  const { metricsMiddleware } = metricsRequestMiddleware
  metricsApp.use(metricsMiddleware)
  const logger = new Logger('Prometheus')
  metricsApp.listen(CONSTANTS.PROMETHEUS_PORT, '0.0.0.0', () => {
    logger.log(`Listening on port ${CONSTANTS.PROMETHEUS_PORT}`)
  })
}

export { metricsRequestMiddleware }

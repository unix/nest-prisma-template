import express from 'express'
import promBundle from 'express-prom-bundle'
import { Logger } from '@nestjs/common'

const metricsRequestMiddleware = (name: string) =>
  promBundle({
    includePath: true,
    includeMethod: true,
    autoregister: false,
    promClient: {
      collectDefaultMetrics: {},
    },
    customLabels: {
      app: name,
    },
  })

export const PrometheusInit = (port: number, name: string) => {
  const metricsApp = express()
  const { metricsMiddleware } = metricsRequestMiddleware(name)
  metricsApp.use(metricsMiddleware)
  const logger = new Logger('Prometheus')
  metricsApp.listen(port, '0.0.0.0', () => {
    logger.log(`Listening on port ${port}`)
  })
}

export { metricsRequestMiddleware }

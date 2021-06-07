import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import cookieParser from 'cookie-parser'
import { ValidationPipe, Logger } from '@nestjs/common'
import { SentryInit, SentryMiddlewares } from '@/configs/sentry'
import { PrometheusInit, metricsRequestMiddleware } from '@/configs/prometheus'

async function bootstrap() {
  if (!process.env.ENV) {
    const logger = new Logger('Bootstrap')
    logger.error('Env load failed.')
    return process.exit(1)
  }

  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: (sourceOrigin, done) => {
      done(null, sourceOrigin)
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    exposedHeaders: ['Date', 'Connection', 'Total-Count'],
  })
  app.use(cookieParser())
  app.setGlobalPrefix('api/v1')
  app.useGlobalPipes(new ValidationPipe())
  app.use(SentryMiddlewares.requestHandler())
  app.use(SentryMiddlewares.tracingHandler())
  app.use(SentryMiddlewares.errorHandler())
  app.use(metricsRequestMiddleware)
  SentryInit(app)
  await app.listen(3001, '0.0.0.0')
  PrometheusInit()
}
bootstrap()

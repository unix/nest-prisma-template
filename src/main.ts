import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: (sourceOrigin, done) => {
      done(null, sourceOrigin)
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    exposedHeaders: ['Date', 'Connection'],
  })
  app.use(cookieParser())
  app.setGlobalPrefix('api/v1')
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3001, '0.0.0.0')
}
bootstrap()

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import development from './development'
import staging from './staging'
import production from './production'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [development, staging, production],
      isGlobal: true,
    }),
  ],
})
export class ConstantsModule {}

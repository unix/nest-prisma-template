import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { SharedModule } from '@/shared/shared.module'
import { RouterModule } from './router/router.module'
import { ScheduleModule } from '@nestjs/schedule'

@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule.forRoot(), SharedModule, RouterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

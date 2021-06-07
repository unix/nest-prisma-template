import { Module } from '@nestjs/common'
import { DemosController } from './demos.controller'
import { DemosService } from './demos.service'

@Module({
  controllers: [DemosController],
  providers: [DemosService],
})
export class DemosModule {}

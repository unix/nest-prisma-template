import { Module } from '@nestjs/common'
import { DemosModule } from './demos/demos.module'

@Module({
  imports: [DemosModule],
})
export class RouterModule {}

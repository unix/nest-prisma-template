import { Global, HttpModule, Module } from '@nestjs/common'
import { PrismaService } from './services'

@Global()
@Module({
  imports: [HttpModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class SharedModule {}

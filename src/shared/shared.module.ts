import { HttpModule } from '@nestjs/axios'
import { Global, Module } from '@nestjs/common'
import { PrismaService, TransientLoggerService } from './services'

@Global()
@Module({
  imports: [HttpModule],
  providers: [PrismaService, TransientLoggerService],
  exports: [PrismaService, TransientLoggerService],
})
export class SharedModule {}

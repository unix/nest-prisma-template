import { HttpModule } from '@nestjs/axios'
import { Global, Module } from '@nestjs/common'
import { AppConfigService, PrismaService, TransientLoggerService } from './services'
import { ConstantsModule } from '@/configs/constants/constants.module'

@Global()
@Module({
  imports: [HttpModule, ConstantsModule],
  providers: [PrismaService, TransientLoggerService, AppConfigService],
  exports: [PrismaService, TransientLoggerService, AppConfigService],
})
export class SharedModule {}

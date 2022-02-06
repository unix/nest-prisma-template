import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { DemosService } from './demos.service'
import { PrimaryKeyPipe } from '@/shared/pipes'
import { Pagination, PaginatiorType, Sortable, SortableType } from '@/shared/decorators'
import { CreateDemosBodyDTO } from './demos'

@Controller('demos')
export class DemosController {
  constructor(private demosService: DemosService) {}

  @Get('/')
  async getAllDemos(
    @Sortable() sort: SortableType,
    @Pagination() pagination: PaginatiorType,
  ) {
    return this.demosService.getAllDemos({ pagination, sort })
  }

  @Get('/:did')
  async getDemo(@Param('did', PrimaryKeyPipe) demoId: number) {
    return this.demosService.getOneDemoById(demoId)
  }

  @Post('/')
  async createDemo(@Body() { content }: CreateDemosBodyDTO) {
    return this.demosService.createDemo({ content })
  }
}

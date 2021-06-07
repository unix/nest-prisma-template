import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { DemosService } from './demos.service'
import { PrimaryKeyPipe } from '@/shared/pipes'
import { Pagination, PaginatiorType, Sortable, SortableType } from '@/shared/decorators'
import { CreateDemosBodyDTO } from './demos'

@Controller('demos')
export class DemosController {
  constructor(private demosSecvice: DemosService) {}

  @Get('/')
  async getAllDemos(@Sortable() sort: SortableType, @Pagination() pagination: PaginatiorType) {
    return this.demosSecvice.getAllDemos({ pagination, sort })
  }

  @Get('/:did')
  async getDemo(@Param('did', PrimaryKeyPipe) demoId: number) {
    return this.demosSecvice.getOneDemoById(demoId)
  }

  @Post('/')
  async createDemo(@Body() { content }: CreateDemosBodyDTO) {
    return this.demosSecvice.createDemo({ content })
  }
}

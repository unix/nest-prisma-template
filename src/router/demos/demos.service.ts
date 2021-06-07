import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/shared/services'
import { PaginatiorType, SortableType } from '@/shared/decorators'
import { Prisma } from '@prisma/client'

export type DemosQueriesType = {
  pagination: PaginatiorType
  sort: SortableType
}

@Injectable()
export class DemosService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllDemos({ pagination, sort }: DemosQueriesType) {
    return this.prisma.demos.findMany({
      skip: pagination.skip,
      take: pagination.take,
      orderBy: { updatedAt: sort },
    })
  }

  async getOneDemoById(id: number) {
    return this.prisma.demos.findUnique({
      where: { id },
    })
  }

  async createDemo(params: Prisma.DemosCreateInput) {
    return this.prisma.demos.create({
      data: {
        content: params.content,
      },
    })
  }
}

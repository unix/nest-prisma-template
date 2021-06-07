import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

export type PaginatiorType = {
  page: number
  perPage: number
  take: number
  skip: number
}

export const Pagination = createParamDecorator(
  (data: unknown, ctx?: ExecutionContext): PaginatiorType => {
    const request = ctx.switchToHttp().getRequest<Request>()
    const queryPage = Number(request.query?.page)
    const queryPerPage = Number(request.query?.per_page)
    const page = !Number.isNaN(queryPage) ? queryPage : 1
    const perPage = !Number.isNaN(queryPerPage) ? queryPerPage : 30
    const skip = (page - 1) * perPage
    return {
      page,
      perPage,
      take: perPage,
      skip: skip <= 0 ? 0 : skip,
    }
  },
)

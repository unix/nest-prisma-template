import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

export type PaginatiorType = {
  page: number
  prePage: number
  take: number
  skip: number
}

export const Pagination = createParamDecorator(
  (data: unknown, ctx?: ExecutionContext): PaginatiorType => {
    const request = ctx.switchToHttp().getRequest<Request>()
    const headerPage = Number(request.headers?.page)
    const headerPrePage = Number(request.headers?.per_page)
    const page = !Number.isNaN(headerPage) ? headerPage : 1
    const prePage = !Number.isNaN(headerPrePage) ? headerPrePage : 30
    const skip = (page - 1) * prePage

    return {
      page,
      prePage,
      take: prePage,
      skip: skip <= 0 ? 0 : skip,
    }
  },
)

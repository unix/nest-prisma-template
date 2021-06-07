import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

export type SortableType = 'desc' | 'asc'
export const Sortable = createParamDecorator(
  (data: unknown, ctx?: ExecutionContext): SortableType => {
    const request = ctx.switchToHttp().getRequest<Request>()
    return request.query?.sort === 'asc' ? 'asc' : 'desc'
  },
)

import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

export type CountableType = boolean
export const Countable = createParamDecorator(
  (data: unknown, ctx?: ExecutionContext): CountableType => {
    const request = ctx.switchToHttp().getRequest<Request>()
    return Boolean(request.query?.count)
  },
)

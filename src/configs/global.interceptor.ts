import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { Response } from 'express'

export interface InterceptorRes<T> {
  data: T
}

export class GlobalInterceptor<T> implements NestInterceptor<T, InterceptorRes<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<InterceptorRes<T>> {
    return next.handle().pipe(
      tap(() => {
        const res = context.switchToHttp().getResponse<Response>()
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
      }),
      map(value => {
        if (typeof value === 'object') return value
        if (typeof value === 'string') return { message: value }
        return value
      }),
    )
  }
}

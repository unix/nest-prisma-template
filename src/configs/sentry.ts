import { Router } from 'express'
import { init, Integrations, Handlers, Transports } from '@sentry/node'
import { Integrations as TracingIntegrations } from '@sentry/tracing'
import { LogLevel } from '@sentry/types'
import CONSTANTS from '@/configs/constants'
import { INestApplication } from '@nestjs/common'
import { IncomingMessage, ServerResponse } from 'http'
const packageJson = require('../../package.json')

class NestTransport extends Transports.HTTPSTransport {
  /**
   *  Sentry classifies reasonable HTTP status codes as service unavailable.
   *  We need to ignore the business error hints from the framework when count the real availability.
   *  E.g.
   *    403 -> Forbidden, Non-200 status code, but the service is still healthy.
   *
   *  Sentry does not currently have any documentation on 'Transport', refer to the following links:
   *   - Abstract base: https://github.com/getsentry/sentry-javascript/blob/master/packages/browser/src/transports/base.ts
   *   - _setupTransport: https://github.com/getsentry/sentry-javascript/blob/master/packages/browser/src/backend.ts#L135-L159
   *   - Testcase: https://github.com/getsentry/sentry-javascript/blob/c94100abb1ea529c2ebeb1e3133be3b1c631fe9f/packages/ember/tests/dummy/app/app.js
   *   - FetchTransport: https://github.com/getsentry/sentry-javascript/blob/c0089b58dc493c7f2e57dbc7a7f496598c6b8683/packages/browser/src/transports/fetch.ts#L78
   */
  static TracePipe(trace: any = {}) {
    const tags = trace?.tags || {}
    const statusCodeTagValue = tags['http.status_code']
    const isServerErrorOrSuccess = /^5|^2/.test(statusCodeTagValue)
    if (!isServerErrorOrSuccess) {
      tags['http.status_code'] = `200 (${statusCodeTagValue})`
      trace['status'] = 'ok'
      trace.tags = tags
    }
    return trace
  }

  static HeadersPipe(headers: Record<string, string> = {}) {
    headers.cookie = ''
    return headers
  }

  static CookiesPipe(cookies: Record<string, string> = {}) {
    if (!cookies['bearer']) return cookies
    const bearer = String(cookies['bearer'])
    cookies['bearer'] = `${bearer.slice(0, 10)}****${bearer.slice(-10)}`
    return cookies
  }

  async sendEvent(event) {
    if (event.contexts.trace) {
      event.contexts.trace = NestTransport.TracePipe(event.contexts.trace)
    }
    event.request.headers = NestTransport.HeadersPipe(event.request.headers)
    event.request.cookies = NestTransport.CookiesPipe(event.request.cookies)
    return super.sendEvent(event)
  }
}

export const SentryInit = (app: Router | INestApplication) => {
  init({
    debug: false,
    dsn: CONSTANTS.SENTRY_DSN,
    environment: CONSTANTS.ENV_LABEL,
    release: packageJson.version || '0.0.0-fallback.0',
    logLevel: LogLevel.Error,
    tracesSampleRate: 1,
    integrations: [
      new Integrations.Http({ tracing: true }),
      new TracingIntegrations.Express({ app: app as Router }),
    ],
    transport: NestTransport,
  })
}

interface MiddlewareError extends Error {
  status?: number | string
  statusCode?: number | string
  status_code?: number | string
  output?: {
    statusCode?: number | string
  }
}

export const SentryMiddlewares = {
  requestHandler: () => Handlers.requestHandler(),
  tracingHandler: () => Handlers.tracingHandler(),
  errorHandler: (): ((
    error: MiddlewareError,
    req: IncomingMessage,
    res: ServerResponse,
    next: (error: MiddlewareError) => void,
  ) => void) =>
    Handlers.errorHandler({
      shouldHandleError(error: MiddlewareError): boolean {
        return `${error.status}`.startsWith('5')
      },
    }),
}

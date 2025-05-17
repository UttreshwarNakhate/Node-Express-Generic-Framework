import { EApplicationEnvironment } from '../constant/application.constant'
import { THttpError } from '../types'
import envConfig from '../config/env.config'
import { Request } from 'express'
import { SOMETHING_WENT_WRONG } from '../constant/messages.constant'
import logger from '../config/logger'

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export default (err: Error | unknown, req: Request, responseStatusCode: number): THttpError => {
    const responseError: THttpError = {
        success: true,
        statusCode: responseStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl
        },
        message: err instanceof Error ? err.message || SOMETHING_WENT_WRONG : SOMETHING_WENT_WRONG,
        data: null,
        trace: err instanceof Error ? { error: err.stack } : null
    }
    logger.info('Controller_Error', {
        meta: responseError
    })

    // production env check
    if (envConfig.ENV === EApplicationEnvironment.PRODUCTION) {
        delete responseError.request.ip
        delete responseError.trace
    }

    return responseError
}

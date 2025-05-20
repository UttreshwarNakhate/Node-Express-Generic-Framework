import { EApplicationEnvironment } from '../constant/application.constant'
import { THttpResponse } from '../types'
import envConfig from '../config/env.config'
import { Request, Response } from 'express'

export default (req: Request, res: Response, responseStatusCode: number, responseMessage: string, data: unknown = null): void => {
    const response: THttpResponse = {
        success: true,
        statusCode: responseStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl
        },
        message: responseMessage,
        data: data
    }
    // production env check
    if (envConfig.ENV === EApplicationEnvironment.PRODUCTION) {
        delete response.request.ip
    }

    res.status(responseStatusCode).json(response)
}

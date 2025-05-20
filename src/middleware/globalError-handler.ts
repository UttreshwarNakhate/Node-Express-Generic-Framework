import { ErrorRequestHandler } from 'express'
import logger from '../config/logger'
import { Request, Response, NextFunction } from 'express'

type TCustomError = Error & {
    status?: number
    expose?: boolean
    code?: string
    isOperational?: boolean
}

export const globalErrorHandler: ErrorRequestHandler = (err: TCustomError, req: Request, res: Response, next: NextFunction): void => {
    const status = err.status || 500
    const message = err.message || 'Internal Server Error'
    const showDetails = process.env.NODE_ENV === 'development' || err.expose === true

    // Log server errors
    if (status >= 500) {
        logger.error({
            message: err.message,
            stack: err.stack,
            method: req.method,
            path: req.path,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            body: req.body,
            params: req.params,
            query: req.query
        })
    }

    // Don't attempt to send response if headers already sent
    if (res.headersSent) {
        return next(err)
    }

    // Send error response
    res.status(status).json({
        success: false,
        error: showDetails ? message : 'Something went wrong',
        ...(showDetails && {
            stack: err.stack,
            ...(err.code && { code: err.code })
        })
    })
}

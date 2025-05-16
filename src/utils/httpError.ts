import { NextFunction, Request } from 'express'
import httpErrorResponse from './httpErrorResponse'

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export default (nextFuc: NextFunction, err: Error | unknown, req: Request, errorStatusCode: number): void => {
    const errorObj = httpErrorResponse(err, req, errorStatusCode)
    return nextFuc(errorObj)
}

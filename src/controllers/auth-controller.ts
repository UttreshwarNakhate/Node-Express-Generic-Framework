import { NextFunction, Request, Response } from 'express'
import httpResponse from '../utils/httpResponse'
import { SUCCESS_MESSAGE } from '../constant/messages.constant'
import httpError from '../utils/httpError'

const self = (req: Request, res: Response, next: NextFunction) => {
    try {
        httpResponse(req, res, 200, SUCCESS_MESSAGE, { d: 'd' })
    } catch (error) {
        httpError(next, error, req, 500)
    }
}

export default self

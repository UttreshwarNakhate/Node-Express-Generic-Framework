import { NextFunction, RequestHandler, Request, Response } from 'express'
import { createUserService, getUserByUserId } from '../services/user-service'
import logger from '../config/logger'
import customErrorHandler from '../services/customErrorHandler-service'
import httpResponse from '../utils/httpResponse'
import {
    FAILED_TO_CREATE_USER,
    FAILED_TO_FETCH_USER,
    PAYLOAD_VALIDATION_FAILED,
    USER_ALREADY_EXISTS,
    USER_CREATED,
    USER_FETCHED,
    USER_NOT_FOUND,
    USERID_REQUIRED
} from '../constant/messages.constant'
import userValidator from '../validators/userValidator'
import { asyncHandler } from '../utils/asyncHandler'
import { UserPayload } from '../types'

// Controller function is used to to create a user
 
export const register = asyncHandler(async (req, res, next) => {
    //CheckList for register steps
    //     [1] Validate the request
    //     [2] authorise the  request
    //     [3] check if user is in the database already
    //     [4] prepare model
    //     [5] store in database
    //     [6] generate JWT token
    //     [7] send response
    try {
        const payload = req.body as UserPayload

        // Validate the payloadObject passing "Create" as the operation type.
        const error = userValidator.Validate(payload, 'Create')
        if (error) {
            // If there is an error returned, log the error and pass it to next().
            logger.error({ PAYLOAD_VALIDATION_FAILED, error })
            return next(customErrorHandler.validationFailed(PAYLOAD_VALIDATION_FAILED))
        }

        // Extract userId from request body
        const { userId } = req.body as { userId?: string }

        // Check if userId is provided
        if (!userId) {
            logger.error(USERID_REQUIRED, {
                meta: {
                    userId
                }
            })
            return next(customErrorHandler.notFound(USERID_REQUIRED))
        }

        // check if user already exists
        const userExist = await getUserByUserId(userId)

        // If user exists then return the error message 'user already exists'
        if (userExist) {
            logger.error(USER_ALREADY_EXISTS, {
                meta: {
                    userExist
                }
            })
            return next(customErrorHandler.alreadyExist(USER_ALREADY_EXISTS))
        } else {
            // Create user if user does not exist
            logger.info(USER_CREATED, {
                meta: {
                    payload
                }
            })
            const user = await createUserService(payload)
            httpResponse(req, res, 200, USER_CREATED, user)
        }
    } catch (error) {
        logger.error('Error in controller:', error)
        next(customErrorHandler.serverError(FAILED_TO_CREATE_USER))
    }
})

// Controller function is used to get user information by userId
export const getUserInfoByUserId: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    // Extract userId from request body
    const { userId } = req.body as { userId?: string }
    logger.info('User id in controller:', userId)

    // Check if userId is provided
    if (!userId) {
        return next(customErrorHandler.notFound(USERID_REQUIRED))
    }

    try {
         
        const user = await getUserByUserId(userId)
        logger.info('User fetched successfully:', {
            meta: {
                user
            }
        })
        // Check if user is found if yes then return the user data
        if (user) {
            logger.info('User fetched successfully:', {
                meta: {
                    user
                }
            })
            httpResponse(req, res, 200, USER_FETCHED, user)
        } else {
            httpResponse(req, res, 401, USER_NOT_FOUND, null)
        }
    } catch (error) {
        logger.error('Error in controller:', {
            meta: {
                error
            }
        })
        next(customErrorHandler.serverError(FAILED_TO_FETCH_USER))
    }
}

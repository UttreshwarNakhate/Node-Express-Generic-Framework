 
 
import db from '../config/db.config'
import logger from '../config/logger'
import { FAILED_TO_FETCH_USER } from '../constant/messages.constant'
import { UserPayload, UserResponse } from '../types'
import customErrorHandler from './customErrorHandler-service'

export const createUserService = async (payload: UserPayload) => {
    try {
         
        const user: UserResponse = await db.user.create({
            data: {
                userId: payload.userId,
                password: payload.password,
                emailId: payload.emailId,
                mobileNumber: payload.mobileNumber,
                createBy: payload.userId,
                updatedBy: payload.userId
            }
        })
        return user
    } catch (error) {
        if (error instanceof Error) {
            logger.error(error.message)
        } else {
            logger.error('An unknown error occurred')
        }
        throw error
    }
}

export const getUserByUserId = async (userId: string) => {
    try {
        logger.info('User id in service:', userId)

         
        const user = await db.user.findUnique({
            where: {
                userId: userId
            }
        })
        return user as UserResponse
    } catch (error) {
        logger.error('Database error fetching user:', error instanceof Error ? error.message : error)
        throw customErrorHandler.serverError(FAILED_TO_FETCH_USER)
    }
}

export type THttpResponse = {
    success: boolean
    statusCode: number
    request: {
        ip?: string | null
        method: string
        url: string
    }
    message: string
    data: unknown
}

export type THttpError = {
    success: boolean
    statusCode: number
    request: {
        ip?: string | null
        method: string
        url: string
    }
    message: string
    data: unknown
    trace?: object | null
}

export type UserResponse = {
    id: number
    userId: string
    password: string
    emailId: string
    mobileNumber: string
    createBy: string
    updatedBy: string
    createdAt: Date
    updatedAt: Date
}

export interface UserPayload {
    userId: string
    password: string
    emailId: string
    mobileNumber: string
    createBy?: string
    updatedBy?: string
}

export type TCustomError = Error & {
    status?: number
    code?: string
    isOperational?: boolean
    expose?: boolean
    // Add any other custom error properties
}

import Joi from 'joi'
import { UserPayload } from '../types'

//Creating a schema that describes the structure and validation rules for creating a user.
const userCreateSchema = Joi.object({
    userId: Joi.string().min(6).max(40).required(),
    password: Joi.string().required(),
    emailId: Joi.string(),
    mobileNumber: Joi.string(),
    createBy: Joi.string(),
    updatedBy: Joi.string()
})

// Creating a schema that describes the structure and validation rules for updating a user.
const userUpdateSchema = Joi.object({
    userId: Joi.string().min(6).max(40).required(),
    password: Joi.string().required(),
    emailId: Joi.string(),
    mobileNumber: Joi.string(),
    createBy: Joi.string(),
    updatedBy: Joi.string()
})

//validates payload according to operation
const Validate = (payloaduser: UserPayload, operation: string) => {
    let isValidated

    // This will check the value of the 'operation' parameter & if the 'operation' is "Create", use 'userCreateSchema'. Otherwise, use 'userUpdateSchema'.
    if (operation == 'Create') {
        isValidated = userCreateSchema.validate(payloaduser)
    } else {
        isValidated = userUpdateSchema.validate(payloaduser)
    }

    // If there is a validation error, return an object with the error details.
    if (isValidated.error) {
        return {
            tatus: '400',
            err: isValidated.error.stack,
            data: null,
            serverTime: new Date().getTime()
        }
    }
}

const userValidator = { Validate }

export default userValidator

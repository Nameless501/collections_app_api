import Joi from 'joi'

export type ValidationKeysTypes = {
    name?: Joi.StringSchema
    password?: Joi.StringSchema
    email?: Joi.StringSchema
}

const validationOptions: ValidationKeysTypes = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
}

export const signUpValidationConfig: ValidationKeysTypes = {
    email: validationOptions.email,
    password: validationOptions.password,
    name: validationOptions.name,
}

export const signInValidationConfig: ValidationKeysTypes = {
    email: validationOptions.email,
    password: validationOptions.password,
}

import Joi from 'joi';

import CollectionSubjects from './subjects.config.js';

export type ValidationKeysTypes = {
    name?: Joi.StringSchema;
    password?: Joi.StringSchema;
    email?: Joi.StringSchema;
    title?: Joi.StringSchema;
    description?: Joi.StringSchema;
    image?: Joi.StringSchema;
    subject?: Joi.StringSchema;
};

const validationOptions: ValidationKeysTypes = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
    title: Joi.string().min(2).required(),
    description: Joi.string().min(2).required(),
    image: Joi.string().uri(),
    subject: Joi.string().valid(...Object.values(CollectionSubjects)),
};

export const signUpValidationConfig: ValidationKeysTypes = {
    email: validationOptions.email,
    password: validationOptions.password,
    name: validationOptions.name,
};

export const signInValidationConfig: ValidationKeysTypes = {
    email: validationOptions.email,
    password: validationOptions.password,
};

export const newCollectionValidationConfig: ValidationKeysTypes = {
    title: validationOptions.title,
    description: validationOptions.description,
    image: validationOptions.image,
    subject: validationOptions.subject,
};

export const newItemValidationConfig: ValidationKeysTypes = {
    title: validationOptions.title,
};

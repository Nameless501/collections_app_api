import Joi, { Schema } from 'joi';

import { CollectionSubjects, FieldTypes } from './models.config.js';

import { ValidationConfigTypes } from '../types/common.types.js';

const validationOptions: ValidationConfigTypes<Schema> = {
    id: Joi.number().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
    title: Joi.string().min(2).required(),
    description: Joi.string().min(2).required(),
    image: Joi.string().uri(),
    subject: Joi.string().valid(...Object.values(CollectionSubjects)),
    fields: Joi.array()
        .items(
            Joi.object({
                type: Joi.string().valid(...Object.values(FieldTypes)),
                label: Joi.string(),
            })
        )
        .required(),
    values: Joi.array()
        .items(
            Joi.object({
                value: Joi.string(),
                fieldId: Joi.number(),
            })
        )
        .required(),
    items: Joi.array()
        .items(
            Joi.object({
                title: Joi.string(),
            })
        )
        .required(),
    tags: Joi.array()
        .items(
            Joi.object({
                value: Joi.string(),
            })
        )
};

export const signUpValidationConfig: ValidationConfigTypes<Schema> = {
    email: validationOptions.email,
    password: validationOptions.password,
    name: validationOptions.name,
};

export const signInValidationConfig: ValidationConfigTypes<Schema> = {
    email: validationOptions.email,
    password: validationOptions.password,
};

export const newCollectionValidationConfig: ValidationConfigTypes<Schema> = {
    title: validationOptions.title,
    description: validationOptions.description,
    image: validationOptions.image,
    subject: validationOptions.subject,
    fields: validationOptions.fields,
};

export const newItemValidationConfig: ValidationConfigTypes<Schema> = {
    title: validationOptions.title,
    collectionId: validationOptions.id,
    itemFields: validationOptions.values,
    tags: validationOptions.tags,
};

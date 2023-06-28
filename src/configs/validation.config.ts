import Joi, { Schema } from 'joi';

import { CollectionSubjects, FieldTypes } from './common.config.js';

import { ValidationConfigTypes } from '../types/common.types.js';

const validationOptions: ValidationConfigTypes<Schema> = {
    id: Joi.number(),
    email: Joi.string().email(),
    password: Joi.string(),
    name: Joi.string().min(2).max(30),
    title: Joi.string().min(2),
    description: Joi.string().min(2),
    image: Joi.string().uri(),
    subject: Joi.string().valid(...Object.values(CollectionSubjects)),
    fields: Joi.array().items(
        Joi.object({
            type: Joi.string().valid(...Object.values(FieldTypes)),
            label: Joi.string(),
        })
    ),
    values: Joi.array().items(
        Joi.object({
            value: Joi.string(),
            fieldId: Joi.number(),
        })
    ),
    items: Joi.array().items(
        Joi.object({
            title: Joi.string(),
        })
    ),
    tags: Joi.array().items(
        Joi.object({
            value: Joi.string(),
        })
    ),
    idArray: Joi.array().items(Joi.number()),
};

export const signUpValidationConfig: ValidationConfigTypes<Schema> = {
    email: validationOptions.email,
    password: validationOptions.password,
    name: validationOptions.name,
    image: validationOptions.image,
};

export const signInValidationConfig: ValidationConfigTypes<Schema> = {
    email: validationOptions.email,
    password: validationOptions.password,
};

export const updateUserValidationConfig: ValidationConfigTypes<Schema> = {
    email: validationOptions.email,
    password: validationOptions.password,
    name: validationOptions.name,
    image: validationOptions.image,
};

export const deleteUsersValidationConfig: ValidationConfigTypes<Schema> = {
    id: validationOptions.idArray,
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

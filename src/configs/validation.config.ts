import Joi from 'joi';

import { CollectionSubjects, FieldTypes } from './enums.config.js';

import {
    ValidationConfigTypes,
    ValidationOptionsType,
} from '../types/common.types.js';

const validationOptions: ValidationOptionsType = {
    getOptionsArray: (options) => Joi.array().items(options),
    getOptionsObject: (options) => Joi.object(options),
    getStringValidation: () => Joi.string(),
    getObjectValuesValidations: (obj) =>
        Joi.string().valid(...Object.values(obj)),
    getEmailValidation: () => Joi.string().email(),
    getUrlValidation: () => Joi.string().uri(),
    getNumberValidation: () => Joi.number(),
};

export const signInValidationConfig: ValidationConfigTypes = {
    email: validationOptions.getEmailValidation().required(),
    password: validationOptions.getStringValidation().required(),
};

export const signUpValidationConfig: ValidationConfigTypes = {
    ...signInValidationConfig,
    name: validationOptions.getStringValidation().required(),
};

export const updateUserValidationConfig: ValidationConfigTypes = {
    email: validationOptions.getEmailValidation(),
    password: validationOptions.getStringValidation(),
    name: validationOptions.getStringValidation(),
};

export const deleteUsersValidationConfig: ValidationConfigTypes = {
    id: validationOptions
        .getOptionsArray(validationOptions.getNumberValidation())
        .required(),
};

export const newCollectionValidationConfig: ValidationConfigTypes = {
    title: validationOptions.getStringValidation().required(),
    description: validationOptions.getStringValidation().required(),
    image: validationOptions.getUrlValidation(),
    subject: validationOptions
        .getObjectValuesValidations(CollectionSubjects)
        .required(),
    fields: validationOptions
        .getOptionsArray(
            validationOptions.getOptionsObject({
                type: validationOptions.getObjectValuesValidations(FieldTypes),
                label: validationOptions.getStringValidation(),
            })
        )
        .required(),
};

export const newItemValidationConfig: ValidationConfigTypes = {
    title: validationOptions.getStringValidation().required(),
    collectionId: validationOptions.getNumberValidation().required(),
    itemFields: validationOptions
        .getOptionsArray(
            validationOptions.getOptionsObject({
                value: validationOptions.getStringValidation(),
                fieldId: validationOptions.getNumberValidation(),
            })
        )
        .required(),
    tags: validationOptions
        .getOptionsArray(
            validationOptions.getOptionsObject({
                value: validationOptions.getStringValidation(),
            })
        )
        .required(),
};

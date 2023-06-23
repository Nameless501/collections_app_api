import { celebrate } from 'celebrate';

import Joi, { Schema } from 'joi';

import { ValidationConfigTypes } from '../types/common.types.js';

function createRequestValidator(schema: ValidationConfigTypes<Schema>) {
    return celebrate({
        body: Joi.object().keys(schema),
    });
}

export default createRequestValidator;

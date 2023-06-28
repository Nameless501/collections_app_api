import { celebrate } from 'celebrate';

import Joi from 'joi';

import { ValidationConfigTypes } from '../types/common.types.js';

function createRequestValidator(schema: ValidationConfigTypes) {
    return celebrate({
        body: Joi.object().keys(schema),
    });
}

export default createRequestValidator;

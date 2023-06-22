import { celebrate, Joi } from 'celebrate';

import { ValidationKeysTypes } from '../configs/validation.config.js';

function createRequestValidator(schema: ValidationKeysTypes) {
    return celebrate({
        body: Joi.object().keys(schema),
    });
}

export default createRequestValidator;

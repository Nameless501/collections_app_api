import { Router } from 'express';

import fieldsController from '../controllers/Fields.controller.js';

import authorization from '../middlewares/Authorization.middleware.js';

import createRequestValidator from '../utils/validation.util.js';

import {
    newFieldsValidationConfig,
    updateFieldValidationConfig,
    updateFieldValueValidationConfig,
} from '../configs/validation.config.js';

import routesConfig from '../configs/routes.config.js';

const {
    updateField,
    updateFieldValue,
    deleteField,
    collectionFields,
    newCollectionFields,
} = routesConfig.fields;

const router: Router = Router();

router.use(authorization.authorize);

router.get(collectionFields, fieldsController.handleGetCollectionFields);

router.post(
    newCollectionFields,
    createRequestValidator(newFieldsValidationConfig),
    fieldsController.handleNewCollectionFields
);

router.patch(
    updateField,
    createRequestValidator(updateFieldValidationConfig),
    fieldsController.handleUpdateField
);

router.patch(
    updateFieldValue,
    createRequestValidator(updateFieldValueValidationConfig),
    fieldsController.handleUpdateFieldValue
);

router.delete(deleteField, fieldsController.handleDeleteField);

export default router;

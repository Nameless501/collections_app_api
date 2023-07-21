import { Router } from 'express';

import fieldsController from '../controllers/Fields.controller.js';

import authorization from '../middlewares/Authorization.middleware.js';

import createRequestValidator from '../utils/validation.util.js';

import { updateFieldValidationConfig } from '../configs/validation.config.js';

import routesConfig from '../configs/routes.config.js';

const { updateField, deleteField, collectionFields } = routesConfig.fields;

const router: Router = Router();

router.use(authorization.authorize);

router.get(collectionFields, fieldsController.handleGetCollectionFields);

router.patch(
    updateField,
    createRequestValidator(updateFieldValidationConfig),
    fieldsController.handleUpdateField
);

router.delete(deleteField, fieldsController.handleDeleteField);

export default router;

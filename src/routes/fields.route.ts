import { Router } from 'express';

import fieldsController from '../controllers/Fields.controller.js';

import authorization from '../middlewares/Authorization.middleware.js';

import createRequestValidator from '../utils/validation.util.js';

import { deleteFieldsValidationConfig, updateFieldValidationConfig } from '../configs/validation.config.js';

import routesConfig from '../configs/routes.config.js';

const { updateField, deleteField } = routesConfig.fields;

const router: Router = Router();

router.use(authorization.authorize);

router.patch(
    updateField,
    createRequestValidator(updateFieldValidationConfig),
    fieldsController.handleUpdateCollection
);

router.delete(
    deleteField,
    createRequestValidator(deleteFieldsValidationConfig),
    fieldsController.handleDeleteFields,
);

export default router;

import { Router } from 'express';

import collectionsController from '../controllers/Collections.controller.js';

import authorization from '../middlewares/Authorization.middleware.js';

import createRequestValidator from '../utils/validation.util.js';

import { newCollectionValidationConfig } from '../configs/validation.config.js';

import routesConfig from '../configs/routes.config.js';

import fileParser from '../configs/multer.config.js';

const { newCollection, userCollections } = routesConfig.collections;

const router: Router = Router();

router.use(authorization.authorize);

router.post(
    newCollection,
    fileParser,
    createRequestValidator(newCollectionValidationConfig),
    collectionsController.handleNewCollection
);

router.get(userCollections, collectionsController.handleUserCollections);

export default router;

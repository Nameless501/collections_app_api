import { Router } from 'express';

import collectionsController from '../controllers/Collections.controller.js';

import authorization from '../middlewares/Authorization.middleware.js';

import createRequestValidator from '../utils/validation.util.js';

import {
    newCollectionValidationConfig,
    updateCollectionValidationConfig,
} from '../configs/validation.config.js';

import routesConfig from '../configs/routes.config.js';

import fileParser from '../configs/multer.config.js';

const {
    allCollections,
    topCollections,
    userCollections,
    collectionData,
    newCollection,
    updateCollection,
    deleteCollection,
} = routesConfig.collections;

const router: Router = Router();

router.get(allCollections, collectionsController.handleGetAllCollections);

router.get(topCollections, collectionsController.handleGetBiggestCollections);

router.get(collectionData, collectionsController.handleGetCollectionData);

router.get(userCollections, collectionsController.handleGetUserCollections);

router.use(authorization.authorize);

router.post(
    newCollection,
    fileParser,
    createRequestValidator(newCollectionValidationConfig),
    collectionsController.handleNewCollection
);

router.patch(
    updateCollection,
    fileParser,
    createRequestValidator(updateCollectionValidationConfig),
    collectionsController.handleUpdateCollection
);

router.delete(deleteCollection, collectionsController.handleDeleteCollection);

export default router;

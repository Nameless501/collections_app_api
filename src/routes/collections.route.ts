import { Router } from 'express';

import collectionsController from '../controllers/Collections.controller.js';

import authorization from '../middlewares/Authorization.middleware.js';

import createRequestValidator from '../utils/validation.util.js';

import { newCollectionValidationConfig, newFieldsValidationConfig, updateCollectionValidationConfig, deleteCollectionValidationConfig } from '../configs/validation.config.js';

import routesConfig from '../configs/routes.config.js';

import fileParser from '../configs/multer.config.js';

const { allCollections, topCollections, collectionData, newCollection, newCollectionFields, updateCollection, deleteCollection } = routesConfig.collections;

const router: Router = Router();

router.get(
    allCollections,
    collectionsController.handleAllCollections
);

router.get(
    topCollections,
    collectionsController.handleCollectionsTop
);

router.get(
    collectionData,
    collectionsController.handleCollectionData
);

router.use(authorization.authorize);

router.post(
    newCollection,
    fileParser,
    createRequestValidator(newCollectionValidationConfig),
    collectionsController.handleNewCollection
);

router.post(
    newCollectionFields,
    createRequestValidator(newFieldsValidationConfig),
    collectionsController.handleNewCollectionFields
);

router.patch(
    updateCollection,
    fileParser,
    createRequestValidator(updateCollectionValidationConfig),
    collectionsController.handleUpdateCollection
);

router.delete(
    deleteCollection,
    createRequestValidator(deleteCollectionValidationConfig),
    collectionsController.handleDeleteCollections,
);

export default router;

import { Router } from 'express';

import itemsController from '../controllers/Items.controller.js';

import createRequestValidator from '../utils/validation.util.js';

import authorization from '../middlewares/Authorization.middleware.js';

import {
    newItemValidationConfig,
    deleteItemsValidationConfig,
} from '../configs/validation.config.js';

import routesConfig from '../configs/routes.config.js';

const { newItem, topNewest, itemData, collectionItems, deleteItems } =
    routesConfig.items;

const router: Router = Router();

router.get(collectionItems, itemsController.handleCollectionItems);

router.get(topNewest, itemsController.handleRecentItems);

router.get(itemData, itemsController.handleItemData);

router.use(authorization.authorize);

router.post(
    newItem,
    createRequestValidator(newItemValidationConfig),
    itemsController.handleNewItem
);

router.delete(
    deleteItems,
    createRequestValidator(deleteItemsValidationConfig),
    itemsController.handleItemsDelete
);

export default router;

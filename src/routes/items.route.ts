import { Router } from 'express';

import itemsController from '../controllers/Items.controller.js';

import createRequestValidator from '../utils/validation.util.js';

import authorization from '../middlewares/Authorization.middleware.js';

import { newItemValidationConfig } from '../configs/validation.config.js';

import routesConfig from '../configs/routes.config.js';

const { newItem, topNewest, itemData, collectionItems, deleteItem } =
    routesConfig.items;

const router: Router = Router();

router.get(collectionItems, itemsController.handleGetCollectionItems);

router.get(topNewest, itemsController.handleRecentItems);

router.get(itemData, itemsController.handleGetItemData);

router.use(authorization.authorize);

router.post(
    newItem,
    createRequestValidator(newItemValidationConfig),
    itemsController.handleNewItem
);

router.delete(deleteItem, itemsController.handleItemDelete);

export default router;

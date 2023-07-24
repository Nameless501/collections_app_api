import { Router } from 'express';

import searchController from '../controllers/Search.controller.js';

import routesConfig from '../configs/routes.config.js';

const { search, searchTag } = routesConfig.search;

const router: Router = Router();

router.get(search, searchController.handleSearch);

router.get(searchTag, searchController.handleSearchByTag);

export default router;

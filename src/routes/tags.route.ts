import { Router } from 'express';

import tagsController from '../controllers/Tags.controller.js';

import routesConfig from '../configs/routes.config.js';

const { allTags } = routesConfig.tags;

const router: Router = Router();

router.get(allTags, tagsController.handleTagsList);

export default router;

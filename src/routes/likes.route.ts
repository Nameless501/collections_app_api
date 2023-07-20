import { Router } from 'express';

import likesController from '../controllers/Likes.controller.js';

import routesConfig from '../configs/routes.config.js';

import authorization from '../middlewares/Authorization.middleware.js';

const { setLike, deleteLike } = routesConfig.likes;

const router: Router = Router();

router.use(authorization.authorize);

router.post(setLike, likesController.handleLikeSet);

router.delete(deleteLike, likesController.handleLikeDelete);

export default router;

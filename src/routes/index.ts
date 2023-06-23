import { NextFunction, Request, Response, Router } from 'express';

import authenticationRouter from './authentication.route.js';

import collectionsRouter from './collections.route.js';

import itemsRouter from './items.route.js';

import routesConfig from '../configs/routes.config.js';

import NotFoundError from '../errors/NotFound.error.js';

const router: Router = Router();

const { authentication, collections, items } = routesConfig.root;

router.use(authentication, authenticationRouter);

router.use(collections, collectionsRouter);

router.use(items, itemsRouter);

router.use((req: Request, res: Response, next: NextFunction) =>
    next(new NotFoundError())
);

export default router;

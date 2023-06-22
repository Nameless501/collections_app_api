import { NextFunction, Request, Response, Router } from 'express';

import authenticationRouter from './authentication.route.js';

import routesConfig from '../configs/routes.config.js';

import NotFoundError from '../errors/NotFound.error.js';

const router: Router = Router();

router.use(routesConfig.authentication.root, authenticationRouter);

router.use((req: Request, res: Response, next: NextFunction) =>
    next(new NotFoundError())
);

export default router;

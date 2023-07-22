import { NextFunction, Request, Response, Router } from 'express';

import authenticationRouter from './authentication.route.js';

import usersRouter from './users.route.js';

import collectionsRouter from './collections.route.js';

import itemsRouter from './items.route.js';

import fieldsRouter from './fields.route.js';

import tagsRouter from './tags.route.js';

import likesRouter from './likes.route.js';

import commentsRouter from './comments.route.js';

import searchRouter from './search.route.js';

import routesConfig from '../configs/routes.config.js';

import NotFoundError from '../errors/NotFound.error.js';

const router: Router = Router();

const {
    authentication,
    collections,
    fields,
    items,
    users,
    tags,
    likes,
    comments,
    search,
} = routesConfig.root;

router.use(authentication, authenticationRouter);

router.use(users, usersRouter);

router.use(collections, collectionsRouter);

router.use(fields, fieldsRouter);

router.use(items, itemsRouter);

router.use(tags, tagsRouter);

router.use(likes, likesRouter);

router.use(comments, commentsRouter);

router.use(search, searchRouter);

router.use((req: Request, res: Response, next: NextFunction) =>
    next(new NotFoundError())
);

export default router;

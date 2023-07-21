import { Router } from 'express';

import commentsController from '../controllers/Comments.controller.js';

import routesConfig from '../configs/routes.config.js';

import authorization from '../middlewares/Authorization.middleware.js';

import createRequestValidator from '../utils/validation.util.js';

import { newCommentValidationConfig, deleteCommentValidationConfig } from '../configs/validation.config.js';

const { itemComments, leaveComment, deleteComment } = routesConfig.comments;

const router: Router = Router();

router.get(itemComments, commentsController.handleItemComments);

router.use(authorization.authorize);

router.post(
    leaveComment,
    createRequestValidator(newCommentValidationConfig),
    commentsController.handleLeaveComment
);

router.delete(
    deleteComment,
    createRequestValidator(deleteCommentValidationConfig),
    commentsController.handleDeleteComment
);

export default router;

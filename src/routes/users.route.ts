import { Router } from 'express';

import authorization from '../middlewares/Authorization.middleware.js';

import createRequestValidator from '../utils/validation.util.js';

import usersController from '../controllers/Users.controller.js';

import collectionsController from '../controllers/Collections.controller.js';

import routesConfig from '../configs/routes.config.js';

import {
    updateUserValidationConfig,
    deleteUsersValidationConfig,
    updateRoleValidationConfig,
} from '../configs/validation.config.js';

const {
    allUsers,
    currentUser,
    userData,
    userCollections,
    updateUser,
    updateRole,
    deleteUsers,
} = routesConfig.users;

const router: Router = Router();

router.get(allUsers, usersController.handleGetAllUsers);

router.get(
    currentUser,
    authorization.authorize,
    usersController.handleGetCurrentUser
);

router.get(
    userData,
    authorization.authorize,
    usersController.handleGetUserData
);

router.get(
    userCollections,
    authorization.authorize,
    collectionsController.handleUserCollections
);

router.patch(
    updateRole,
    createRequestValidator(updateRoleValidationConfig),
    usersController.handleUsersRoleUpdate
);

router.patch(
    updateUser,
    createRequestValidator(updateUserValidationConfig),
    usersController.handleUpdateUser
);

router.delete(
    deleteUsers,
    createRequestValidator(deleteUsersValidationConfig),
    usersController.handleDeleteUsers
);

export default router;

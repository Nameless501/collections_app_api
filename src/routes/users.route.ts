import { Router } from 'express';

import authorization from '../middlewares/Authorization.middleware.js';

import createRequestValidator from '../utils/validation.util.js';

import usersController from '../controllers/Users.controller.js';

import routesConfig from '../configs/routes.config.js';

import {
    updateUserValidationConfig,
    deleteUsersValidationConfig,
    updateRoleValidationConfig,
} from '../configs/validation.config.js';

const { allUsers, currentUser, userData, updateUser, updateRole, deleteUsers } =
    routesConfig.users;

const router: Router = Router();

router.use(authorization.authorize);

router.get(allUsers, usersController.handleGetAllUsers);

router.get(currentUser, usersController.handleGetCurrentUser);

router.get(userData, usersController.handleGetUserData);

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

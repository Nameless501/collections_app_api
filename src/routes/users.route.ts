import { Router } from 'express';

import createRequestValidator from '../utils/validation.util.js';

import usersController from '../controllers/Users.controller.js';

import routesConfig from '../configs/routes.config.js';

import {
    updateUserValidationConfig,
    deleteUsersValidationConfig,
} from '../configs/validation.config.js';

const { allUsers, updateUser, deleteUsers } = routesConfig.users;

const router: Router = Router();

router.get(allUsers, usersController.handleGetAllUsers);

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

import { Router } from 'express'

import authenticationController from '../controllers/Authentication.controller.js'

import createRequestValidator from '../utils/validation.util.js'

import {
    signUpValidationConfig,
    signInValidationConfig,
} from '../configs/validation.config.js'

import routesConfig from '../configs/routes.config.js'

const { signIn, signUp, signOut } = routesConfig.authentication

const router: Router = Router()

router.post(
    signIn,
    createRequestValidator(signInValidationConfig),
    authenticationController.handleSignIn
)

router.post(
    signUp,
    createRequestValidator(signUpValidationConfig),
    authenticationController.handleSignUp
)

router.post(signOut, authenticationController.handleSignOut)

export default router

import { Router } from 'express'

import authenticationRouter from './authentication.route.js'

import routesConfig from '../configs/routes.config.js'

const router: Router = Router()

router.use(routesConfig.authentication.root, authenticationRouter)

export default router

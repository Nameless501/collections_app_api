import { Router, Request, Response } from 'express';

import routesConfig from '../configs/routes.config.js';

const router: Router = Router();

router.all(routesConfig.root, (req: Request, res: Response): void => {
    res.sendStatus(200);
})

export default router;
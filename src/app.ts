import express, { Express } from 'express';

import helmet from 'helmet';

import cors from 'cors';

import cookieParser from 'cookie-parser';

import 'dotenv/config';

import router from './routes/index.js';

import routesConfig from './configs/routes.config.js';

import corsConfig from './configs/cors.config.js';

import limiter from './configs/limiter.config.js';

import { createRequestLogger, createErrorLogger } from './utils/logger.util.js';

import errorHandler from './middlewares/ErrorHandler.middleware.js';

const app: Express = express();

app.use(helmet());

app.use('*', cors(corsConfig));

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(createRequestLogger());

app.use(limiter);

app.use(routesConfig.root, router);

app.use(createErrorLogger());

app.use(errorHandler.watch);

app.listen(process.env.PORT);

import { SignOptions } from 'jsonwebtoken';

import { CorsOptions } from 'cors';

import { CookiesConfigType } from '../types/common.types.js';

export const cookiesConfig: CookiesConfigType = {
    name: 'jwt',
    options: {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    },
} as const;

export const tokenConfig: SignOptions = {
    expiresIn: '7d',
} as const;

export const corsConfig: CorsOptions = {
    origin: ['http://127.0.0.1:5173', 'https://projectfrontend-production.up.railway.app'],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
    credentials: true,
};

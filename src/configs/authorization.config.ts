import { SignOptions } from 'jsonwebtoken';

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

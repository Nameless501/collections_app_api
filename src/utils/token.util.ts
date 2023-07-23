import jwt from 'jsonwebtoken';

import 'dotenv/config.js';

import { tokenConfig } from '../configs/common.config.js';

const { JWT_KEY } = process.env;

export const assignToken = (id: number) =>
    jwt.sign({ id }, JWT_KEY ?? '', tokenConfig);

export const verifyToken = (token: string) => jwt.verify(token, JWT_KEY ?? '');

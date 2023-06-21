import jwt from 'jsonwebtoken'

import 'dotenv/config.js'

import { tokenConfig } from '../configs/cokies.config.js'

const { JWT_KEY } = process.env

export const assignToken = (id: number): string => jwt.sign({ id }, JWT_KEY as string, tokenConfig);

export const verifyToken = (token: string) => jwt.verify(token, JWT_KEY as string);
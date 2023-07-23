import bcrypt from 'bcrypt';

import WrongCredentialsError from '../errors/WrongCredentials.error.js';

import { ComparePasswords, HashPassword } from '../types/common.types.js';

export const hashPassword: HashPassword = (password) =>
    bcrypt.hash(password, 10);

export const hashPasswordSync = (password: string): string =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const comparePassword: ComparePasswords = async (
    password,
    passwordHash
) => {
    const isMatched = await bcrypt.compare(password, passwordHash);
    if (!isMatched) {
        throw new WrongCredentialsError();
    }
};

import bcrypt from 'bcrypt'

import WrongCredentialsError from '../errors/WrongCredentials.error.js'

export const hashPassword = (password: string): Promise<string> =>
    bcrypt.hash(password, 10)

export const comparePassword = async (
    password: string,
    passwordHash: string
): Promise<void> | never => {
    const isMatched = await bcrypt.compare(password, passwordHash)
    if (!isMatched) {
        throw new WrongCredentialsError()
    }
}

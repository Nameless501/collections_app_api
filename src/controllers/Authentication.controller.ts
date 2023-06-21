import { Request, Response, NextFunction } from 'express'

import UserService from '../services/User.service.js'

import { IUserModel } from '../models/user.model.js'

import HttpStatusCodes from '../configs/httpCodes.config.js'

import { assignToken } from '../utils/token.util.js'

import { cookiesConfig, CookiesConfigType } from '../configs/cokies.config.js'

import { comparePassword, hashPassword } from '../utils/passwordHash.util.js'

type UserCredentialsType = {
    password: string
    name: string
    email: string
}

class AuthenticationController {
    constructor(
        private findUser: (email: string) => Promise<IUserModel> | never,
        private createUser: (
            payload: UserCredentialsType
        ) => Promise<IUserModel> | never,
        private assignToken: (id: number) => string,
        private hashPassword: (password: string) => Promise<string>,
        private comparePassword: (
            password: string,
            passwordHash: string
        ) => Promise<void> | never,
        private cookiesConfig: CookiesConfigType
    ) {}

    private handleUserCreate = async ({
        name,
        password,
        email,
    }: UserCredentialsType): Promise<IUserModel> => {
        const passwordHash = await this.hashPassword(password)
        return this.createUser({ name, email, password: passwordHash })
    }

    private hideUserPassword = (user: IUserModel): IUserModel => {
        user.password = undefined
        return user
    }

    public handleSignUp = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const user = await this.handleUserCreate(req.body)
            res.status(HttpStatusCodes.dataCreated).send(
                this.hideUserPassword(user)
            )
        } catch (err) {
            next(err)
        }
    }

    private setCookieToken = (id: number, res: Response): void => {
        const token = this.assignToken(id)
        res.cookie(this.cookiesConfig.name, token, this.cookiesConfig.options)
    }

    public handleSignIn = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { email, password } = req.body
            const user = await this.findUser(email)
            await this.comparePassword(password, user.password as string)
            this.setCookieToken(user.id as number, res)
            res.send(this.hideUserPassword(user))
        } catch (err) {
            next(err)
        }
    }

    public handleSignOut = (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        try {
            res.clearCookie(
                this.cookiesConfig.name,
                this.cookiesConfig.options
            ).sendStatus(HttpStatusCodes.success)
        } catch (err) {
            next(err)
        }
    }
}

const user = new UserService()

const authenticationController = new AuthenticationController(
    user.findUser,
    user.createUser,
    assignToken,
    hashPassword,
    comparePassword,
    cookiesConfig
)

export default authenticationController

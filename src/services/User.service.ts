import UserModel, { IUserModel } from '../models/user.model.js'

import WrongCredentialsError from '../errors/WrongCredentials.error.js'

class UserService {
    private model = UserModel

    public createUser = (payload: {
        name: string
        email: string
        password: string
    }): Promise<IUserModel> => this.model.create(payload)

    public findUser = async (email: string): Promise<IUserModel> | never => {
        const user: IUserModel | null = await this.model.findOne({
            where: { email },
        })
        if (!user) {
            throw new WrongCredentialsError()
        }
        return user
    }
}

export default UserService

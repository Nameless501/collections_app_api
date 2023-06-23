import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

export interface IUserModel
    extends Model<
        InferAttributes<IUserModel>,
        InferCreationAttributes<IUserModel>
    > {
    name: string;
    email: string;
    password: string;
    isAdmin: CreationOptional<boolean>;
    id: CreationOptional<number>;
}

export type SignOutputType = Partial<IUserModel>;

export type SignInInputType = {
    email: string;
    password: string;
};

export type SignUpInputType = SignInInputType & {
    name: string;
};
